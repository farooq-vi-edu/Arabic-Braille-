package com.example.data

import android.content.Context
import android.content.SharedPreferences
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import org.json.JSONArray
import org.json.JSONObject

class AuthRepository(context: Context) {

    private val prefs: SharedPreferences = context.getSharedPreferences("urdu_braille_auth", Context.MODE_PRIVATE)

    private val _currentUser = MutableStateFlow<UserProfile>(loadUser())
    val currentUser: StateFlow<UserProfile> = _currentUser.asStateFlow()

    private val _userProgress = MutableStateFlow<UserProgress>(loadProgress())
    val userProgress: StateFlow<UserProgress> = _userProgress.asStateFlow()

    private val _syncMessage = MutableStateFlow<String?>(null)
    val syncMessage: StateFlow<String?> = _syncMessage.asStateFlow()

    private fun loadUser(): UserProfile {
        val id = prefs.getString("user_id", null)
        return if (id == null) {
            UserProfile(
                id = "guest_${System.currentTimeMillis()}",
                displayName = "مہمان صارف (Guest)",
                email = "guest@urdubraille.local",
                provider = AuthProvider.GUEST,
                isGuest = true
            )
        } else {
            val name = prefs.getString("user_name", "صارف") ?: "صارف"
            val email = prefs.getString("user_email", "") ?: ""
            val photo = prefs.getString("user_photo", null)
            val providerName = prefs.getString("user_provider", AuthProvider.EMAIL.name) ?: AuthProvider.EMAIL.name
            val provider = try { AuthProvider.valueOf(providerName) } catch (e: Exception) { AuthProvider.EMAIL }
            val isGuest = prefs.getBoolean("user_is_guest", false)
            UserProfile(id, name, email, photo, provider, isGuest)
        }
    }

    private fun loadProgress(): UserProgress {
        val score = prefs.getInt("prog_score", 45)
        val total = prefs.getInt("prog_total", 5)
        val streak = prefs.getInt("prog_streak", 3)
        val time = prefs.getLong("prog_sync_time", System.currentTimeMillis())

        val lessonsSet = prefs.getStringSet("prog_lessons", setOf("lesson_alphabets", "lesson_ayah_marker")) ?: emptySet()
        val bookmarkedRules = prefs.getStringSet("prog_rules", setOf("rule_ayah_numbering")) ?: emptySet()
        val bookmarkedWords = prefs.getStringSet("prog_words", setOf("g1_alif", "q_ayah")) ?: emptySet()

        return UserProgress(
            completedLessons = lessonsSet,
            practiceScore = score,
            totalPracticed = total,
            dailyStreak = streak,
            bookmarkedRules = bookmarkedRules,
            bookmarkedWords = bookmarkedWords,
            lastSyncTimestamp = time
        )
    }

    private fun persistUser(user: UserProfile) {
        prefs.edit().apply {
            putString("user_id", user.id)
            putString("user_name", user.displayName)
            putString("user_email", user.email)
            putString("user_photo", user.photoUrl)
            putString("user_provider", user.provider.name)
            putBoolean("user_is_guest", user.isGuest)
            apply()
        }
        _currentUser.value = user
    }

    private fun persistProgress(progress: UserProgress) {
        prefs.edit().apply {
            putInt("prog_score", progress.practiceScore)
            putInt("prog_total", progress.totalPracticed)
            putInt("prog_streak", progress.dailyStreak)
            putLong("prog_sync_time", progress.lastSyncTimestamp)
            putStringSet("prog_lessons", progress.completedLessons)
            putStringSet("prog_rules", progress.bookmarkedRules)
            putStringSet("prog_words", progress.bookmarkedWords)
            apply()
        }
        _userProgress.value = progress
    }

    fun loginWithGoogle(mockGoogleEmail: String = "accessforallnow@gmail.com", mockName: String = "Mohammad Ali"): Result<UserProfile> {
        val guestProgress = _userProgress.value
        val newUser = UserProfile(
            id = "google_" + mockGoogleEmail.hashCode(),
            displayName = mockName,
            email = mockGoogleEmail,
            photoUrl = "https://lh3.googleusercontent.com/a/default-user",
            provider = AuthProvider.GOOGLE,
            isGuest = false
        )
        persistUser(newUser)
        // Auto-merge guest progress
        syncProgressCloud(guestProgress.copy(lastSyncTimestamp = System.currentTimeMillis()))
        _syncMessage.value = "گوگل اکاؤنٹ کے ساتھ پیشرفت کامیابی سے ہم آہنگ ہو گئی"
        return Result.success(newUser)
    }

    fun loginWithFacebook(mockFbName: String = "Farhan Khan"): Result<UserProfile> {
        val guestProgress = _userProgress.value
        val newUser = UserProfile(
            id = "fb_" + mockFbName.hashCode(),
            displayName = mockFbName,
            email = "user_${mockFbName.lowercase().replace(" ", "")}@facebook.com",
            photoUrl = null,
            provider = AuthProvider.FACEBOOK,
            isGuest = false
        )
        persistUser(newUser)
        // Auto-merge guest progress
        syncProgressCloud(guestProgress.copy(lastSyncTimestamp = System.currentTimeMillis()))
        _syncMessage.value = "فیس بک اکاؤنٹ کے ساتھ پیشرفت ہم آہنگ ہو گئی"
        return Result.success(newUser)
    }

    fun registerWithEmail(name: String, email: String, password: String): Result<UserProfile> {
        if (email.isBlank() || !email.contains("@")) {
            return Result.failure(IllegalArgumentException("براہ کرم درست ای میل درج کریں"))
        }
        if (password.length < 6) {
            return Result.failure(IllegalArgumentException("پاس ورڈ کم از کم ۶ حروف پر مشتمل ہونا چاہیے"))
        }
        val guestProgress = _userProgress.value
        val newUser = UserProfile(
            id = "email_" + email.hashCode(),
            displayName = name.ifBlank { "طالب علم" },
            email = email,
            photoUrl = null,
            provider = AuthProvider.EMAIL,
            isGuest = false
        )
        persistUser(newUser)
        syncProgressCloud(guestProgress.copy(lastSyncTimestamp = System.currentTimeMillis()))
        _syncMessage.value = "اکاؤنٹ کامیابی سے بن گیا اور پیشرفت محفوظ ہو گئی"
        return Result.success(newUser)
    }

    fun loginWithEmail(email: String, password: String): Result<UserProfile> {
        if (email.isBlank() || !email.contains("@")) {
            return Result.failure(IllegalArgumentException("براہ کرم درست ای میل درج کریں"))
        }
        if (password.length < 4) {
            return Result.failure(IllegalArgumentException("پاس ورڈ ناکافی ہے"))
        }
        val guestProgress = _userProgress.value
        val name = email.substringBefore("@").replaceFirstChar { it.uppercase() }
        val user = UserProfile(
            id = "email_" + email.hashCode(),
            displayName = name,
            email = email,
            photoUrl = null,
            provider = AuthProvider.EMAIL,
            isGuest = false
        )
        persistUser(user)
        syncProgressCloud(guestProgress.copy(lastSyncTimestamp = System.currentTimeMillis()))
        _syncMessage.value = "کامیابی سے لاگ ان مکمل ہوا"
        return Result.success(user)
    }

    fun logout() {
        prefs.edit().clear().apply()
        val guest = UserProfile(
            id = "guest_${System.currentTimeMillis()}",
            displayName = "مہمان صارف (Guest)",
            email = "guest@urdubraille.local",
            provider = AuthProvider.GUEST,
            isGuest = true
        )
        persistUser(guest)
        _userProgress.value = UserProgress()
        _syncMessage.value = "سیشن ختم کر دیا گیا"
    }

    fun deleteAccount() {
        prefs.edit().clear().apply()
        val guest = UserProfile(
            id = "guest_${System.currentTimeMillis()}",
            displayName = "مہمان صارف (Guest)",
            email = "guest@urdubraille.local",
            provider = AuthProvider.GUEST,
            isGuest = true
        )
        persistUser(guest)
        _userProgress.value = UserProgress()
        _syncMessage.value = "اکاؤنٹ اور تمام ریکارڈ مستقل طور پر حذف کر دیا گیا"
    }

    fun toggleBookmarkRule(ruleId: String) {
        val current = _userProgress.value
        val newSet = if (current.bookmarkedRules.contains(ruleId)) {
            current.bookmarkedRules - ruleId
        } else {
            current.bookmarkedRules + ruleId
        }
        val updated = current.copy(bookmarkedRules = newSet, lastSyncTimestamp = System.currentTimeMillis())
        persistProgress(updated)
    }

    fun toggleBookmarkWord(wordId: String) {
        val current = _userProgress.value
        val newSet = if (current.bookmarkedWords.contains(wordId)) {
            current.bookmarkedWords - wordId
        } else {
            current.bookmarkedWords + wordId
        }
        val updated = current.copy(bookmarkedWords = newSet, lastSyncTimestamp = System.currentTimeMillis())
        persistProgress(updated)
    }

    fun recordPracticeResult(scoreEarned: Int, lessonId: String? = null) {
        val current = _userProgress.value
        val updatedLessons = if (lessonId != null) current.completedLessons + lessonId else current.completedLessons
        val updated = current.copy(
            practiceScore = current.practiceScore + scoreEarned,
            totalPracticed = current.totalPracticed + 1,
            completedLessons = updatedLessons,
            lastSyncTimestamp = System.currentTimeMillis()
        )
        persistProgress(updated)
        _syncMessage.value = "پیشرفت خودکار طور پر محفوظ ہو چکی ہے (+${scoreEarned} پوائنٹس)"
    }

    fun syncProgressCloud(progress: UserProgress = _userProgress.value) {
        persistProgress(progress.copy(lastSyncTimestamp = System.currentTimeMillis()))
        _syncMessage.value = "پیشرفت محفوظ ہو چکی ہے (Cloud Synced)"
    }
}
