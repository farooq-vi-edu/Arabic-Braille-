package com.example.ui.screens

import android.content.Context
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.braille.UrduBrailleData
import com.example.braille.UrduBrailleEngine
import com.example.data.AuthRepository

@Composable
fun PracticeScreen(
    authRepo: AuthRepository,
    onOpenAuthModal: () -> Unit
) {
    val context = LocalContext.current
    val vibrator = remember { context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator }

    var selectedTier by remember { mutableIntStateOf(1) }
    var currentItemIndex by remember { mutableIntStateOf(0) }
    var selectedDots by remember { mutableStateOf(setOf<Int>()) }
    var isSlateMode by remember { mutableStateOf(false) } // Mirror layout mode
    var feedbackMessage by remember { mutableStateOf<String?>(null) }
    var isCorrect by remember { mutableStateOf(false) }

    val practiceItems = remember(selectedTier) {
        when (selectedTier) {
            1 -> UrduBrailleData.DICTIONARY_ENTRIES.filter { it.grade == "درجہ اول" }
            2 -> UrduBrailleData.DICTIONARY_ENTRIES.filter { it.grade == "درجہ دوم" }
            3 -> UrduBrailleData.DICTIONARY_ENTRIES.filter { it.category == "قرآنی بریل" || it.id.startsWith("q_") }
            else -> UrduBrailleData.DICTIONARY_ENTRIES
        }
    }

    val currentTarget = practiceItems.getOrNull(currentItemIndex % practiceItems.size)

    fun vibrateShort(success: Boolean) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val millis = if (success) 50L else 120L
            vibrator?.vibrate(VibrationEffect.createOneShot(millis, VibrationEffect.DEFAULT_AMPLITUDE))
        } else {
            @Suppress("DEPRECATION")
            vibrator?.vibrate(50)
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Tiers selector (TabRow)
        ScrollableTabRow(
            selectedTabIndex = selectedTier - 1,
            edgePadding = 8.dp,
            containerColor = MaterialTheme.colorScheme.surface
        ) {
            Tab(selected = selectedTier == 1, onClick = { selectedTier = 1; currentItemIndex = 0; feedbackMessage = null }) {
                Text("ٹائر ۱: حروف و اعراب", modifier = Modifier.padding(12.dp), fontWeight = FontWeight.Bold)
            }
            Tab(selected = selectedTier == 2, onClick = { selectedTier = 2; currentItemIndex = 0; feedbackMessage = null }) {
                Text("ٹائر ۲: درجہ دوم مخففات", modifier = Modifier.padding(12.dp), fontWeight = FontWeight.Bold)
            }
            Tab(selected = selectedTier == 3, onClick = { selectedTier = 3; currentItemIndex = 0; feedbackMessage = null }) {
                Text("ٹائر ۳: قرآنی نشانِ آیت و اوقاف", modifier = Modifier.padding(12.dp), fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Perkins vs Slate & Stylus Simulator Mode Toggle
        Card(
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 12.dp, vertical = 6.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = if (isSlateMode) "سلیٹ و قلم موڈ (Slate & Stylus - معکوس دائیں سے بائیں)" else "پرکنز موڈ (Perkins Embosser - بائیں سے دائیں)",
                    style = MaterialTheme.typography.bodySmall,
                    fontWeight = FontWeight.SemiBold
                )
                Switch(
                    checked = isSlateMode,
                    onCheckedChange = { isSlateMode = it }
                )
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Target Question Card
        currentTarget?.let { target ->
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "اس لفظ / نشان کے بریل نقاط ابھاریں:",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onPrimaryContainer
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = target.urdu,
                        fontSize = 34.sp,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary
                    )
                    Text(
                        text = target.description,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.8f)
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // 6-Dot Interactive Canvas (Supports Perkins & Mirrored Slate)
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(3.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = if (isSlateMode) "سلیٹ لے آؤٹ (نقاط دائیں سے بائیں)" else "پرکنز لے آؤٹ (نقاط بائیں سے دائیں)",
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.outline
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    // Left/Right column placement based on isSlateMode:
                    // Perkins: Left has 1,2,3; Right has 4,5,6
                    // Slate (Mirrored): Left has 4,5,6; Right has 1,2,3
                    val leftColDots = if (isSlateMode) listOf(4, 5, 6) else listOf(1, 2, 3)
                    val rightColDots = if (isSlateMode) listOf(1, 2, 3) else listOf(4, 5, 6)

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // Left Column
                        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                            leftColDots.forEach { dot ->
                                PracticeDotButton(dotNum = dot, active = selectedDots.contains(dot)) {
                                    vibrateShort(true)
                                    selectedDots = if (selectedDots.contains(dot)) selectedDots - dot else selectedDots + dot
                                }
                            }
                        }

                        // Current Cell Preview
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(
                                text = UrduBrailleEngine.dotsToUnicode(selectedDots.toList().sorted()),
                                fontSize = 48.sp,
                                color = MaterialTheme.colorScheme.primary
                            )
                            Text(
                                text = if (selectedDots.isEmpty()) "کوئی نہیں" else "منتخب: ${selectedDots.sorted().joinToString(", ")}",
                                style = MaterialTheme.typography.bodySmall
                            )
                        }

                        // Right Column
                        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                            rightColDots.forEach { dot ->
                                PracticeDotButton(dotNum = dot, active = selectedDots.contains(dot)) {
                                    vibrateShort(true)
                                    selectedDots = if (selectedDots.contains(dot)) selectedDots - dot else selectedDots + dot
                                }
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    // Feedback Message
                    AnimatedVisibility(visible = feedbackMessage != null) {
                        Card(
                            shape = RoundedCornerShape(10.dp),
                            colors = CardDefaults.cardColors(
                                containerColor = if (isCorrect) Color(0xFFE8F5E9) else Color(0xFFFFEBEE)
                            ),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(
                                text = feedbackMessage ?: "",
                                color = if (isCorrect) Color(0xFF2E7D32) else Color(0xFFC62828),
                                fontWeight = FontWeight.Bold,
                                textAlign = TextAlign.Center,
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(10.dp)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    // Check Answer / Next Question Buttons
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Button(
                            onClick = {
                                val expected = target.dots.sorted()
                                val actual = selectedDots.toList().sorted()
                                if (actual == expected) {
                                    isCorrect = true
                                    feedbackMessage = "شاباش! بالکل درست جواب۔ (+10 پوائنٹس)"
                                    vibrateShort(true)
                                    authRepo.recordPracticeResult(10, "lesson_${target.id}")
                                } else {
                                    isCorrect = false
                                    feedbackMessage = "درست نہیں! متوقع نقاط: ${expected.joinToString(", ")}"
                                    vibrateShort(false)
                                }
                            },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Text("جواب چیک کریں")
                        }

                        OutlinedButton(
                            onClick = {
                                currentItemIndex++
                                selectedDots = emptySet()
                                feedbackMessage = null
                            },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Text("اگلا سوال")
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun PracticeDotButton(
    dotNum: Int,
    active: Boolean,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .size(52.dp)
            .clip(CircleShape)
            .background(if (active) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surfaceVariant)
            .border(2.dp, if (active) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline, CircleShape)
            .clickable { onClick() },
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = "$dotNum",
            color = if (active) MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSurfaceVariant,
            fontWeight = FontWeight.Bold,
            fontSize = 18.sp
        )
    }
}
