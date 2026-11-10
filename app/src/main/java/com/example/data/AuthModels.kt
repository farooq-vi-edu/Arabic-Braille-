package com.example.data

enum class AuthProvider {
    GOOGLE,
    FACEBOOK,
    EMAIL,
    GUEST
}

data class UserProfile(
    val id: String,
    val displayName: String,
    val email: String,
    val photoUrl: String? = null,
    val provider: AuthProvider = AuthProvider.GUEST,
    val isGuest: Boolean = true,
    val createdAt: Long = System.currentTimeMillis()
)

data class UserProgress(
    val completedLessons: Set<String> = emptySet(),
    val practiceScore: Int = 0,
    val totalPracticed: Int = 0,
    val dailyStreak: Int = 1,
    val bookmarkedRules: Set<String> = emptySet(),
    val bookmarkedWords: Set<String> = emptySet(),
    val lastSyncTimestamp: Long = System.currentTimeMillis()
)
