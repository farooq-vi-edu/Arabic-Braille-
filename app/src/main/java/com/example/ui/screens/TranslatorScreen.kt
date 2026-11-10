package com.example.ui.screens

import android.content.Context
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.braille.BrailleCell
import com.example.braille.UrduBrailleEngine
import com.example.data.AuthRepository

@Composable
fun TranslatorScreen(
    authRepo: AuthRepository,
    onOpenAuthModal: () -> Unit
) {
    val context = LocalContext.current
    val clipboardManager = LocalClipboardManager.current
    val vibrator = remember { context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator }

    var inputText by remember { mutableStateOf("الرَّحِيمِ ۝١") }
    var isGrade2 by remember { mutableStateOf(false) }
    var showPerkinsKeyboard by remember { mutableStateOf(false) }
    var selectedCell by remember { mutableStateOf<BrailleCell?>(null) }
    var activeDots by remember { mutableStateOf(setOf<Int>()) }

    val user by authRepo.currentUser.collectAsState()
    val progress by authRepo.userProgress.collectAsState()

    val translatedCells = remember(inputText, isGrade2) {
        UrduBrailleEngine.translateToBraille(inputText, isGrade2)
    }

    val brailleUnicodeOutput = remember(translatedCells) {
        translatedCells.joinToString("") { it.unicode }
    }

    fun vibrateShort() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            vibrator?.vibrate(VibrationEffect.createOneShot(30, VibrationEffect.DEFAULT_AMPLITUDE))
        } else {
            @Suppress("DEPRECATION")
            vibrator?.vibrate(30)
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Guest Sync Prompt Bar if guest
        if (user.isGuest) {
            Card(
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.tertiaryContainer),
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onOpenAuthModal() }
            ) {
                Row(
                    modifier = Modifier.padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(Icons.Default.CloudQueue, contentDescription = null, tint = MaterialTheme.colorScheme.onTertiaryContainer)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "پیشرفت محفوظ کرنے کے لیے اکاؤنٹ منسلک کریں",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onTertiaryContainer,
                        modifier = Modifier.weight(1f)
                    )
                    Text(
                        text = "منسلک کریں",
                        fontWeight = FontWeight.Bold,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
            }
            Spacer(modifier = Modifier.height(12.dp))
        }

        // Translation Mode Toggle (Grade 1 vs Grade 2)
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = if (isGrade2) "درجہ دوم (مخففات و اختصارات - Grade 2)" else "درجہ اول (حرفی بریل - Grade 1)",
                    fontWeight = FontWeight.Bold,
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(start = 8.dp)
                )

                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = "مخففات",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.outline
                    )
                    Switch(
                        checked = isGrade2,
                        onCheckedChange = { isGrade2 = it },
                        modifier = Modifier.padding(start = 6.dp)
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Urdu Input Field
        OutlinedTextField(
            value = inputText,
            onValueChange = { inputText = it },
            label = { Text("اردو عبارت یا قرآنی آیت درج کریں") },
            placeholder = { Text("مثال: الرَّحِيمِ ۝١ یا وہ بہت خوش ہے") },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            minLines = 3,
            trailingIcon = {
                Row {
                    if (inputText.isNotEmpty()) {
                        IconButton(onClick = { inputText = "" }) {
                            Icon(Icons.Default.Clear, contentDescription = "صاف کریں")
                        }
                    }
                    IconButton(onClick = { showPerkinsKeyboard = !showPerkinsKeyboard }) {
                        Icon(
                            imageVector = if (showPerkinsKeyboard) Icons.Default.KeyboardHide else Icons.Default.Dialpad,
                            contentDescription = "پرکنز کی پیڈ"
                        )
                    }
                }
            }
        )

        // Presets Chips
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp)
                .horizontalScroll(rememberScrollState()),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            SuggestionChip(
                onClick = { inputText = "الرَّحِيمِ ۝١" },
                label = { Text("الرَّحِيمِ ۝١") }
            )
            SuggestionChip(
                onClick = { inputText = "الرَّحِيمِ ۚ ۝ ١" },
                label = { Text("وقف + آیت ۱") }
            )
            SuggestionChip(
                onClick = { inputText = "وہ بہت خوش ہے" },
                label = { Text("درجہ دوم مخففات") }
            )
            SuggestionChip(
                onClick = { inputText = "مُحَمَّد رَسُولُ اللَّهِ" },
                label = { Text("تشدید و اعراب") }
            )
        }

        // Perkins 6-Key Simulator Panel
        AnimatedVisibility(visible = showPerkinsKeyboard) {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp)
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "پرکنز ۶-کی بریلر (Perkins 6-Key Simulator)",
                        fontWeight = FontWeight.Bold,
                        style = MaterialTheme.typography.titleSmall
                    )
                    Text(
                        text = "نقاط منتخب کریں اور 'خانہ شامل کریں' پر کلک کریں",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.outline
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    // 6 Dots interactive layout:
                    // Left column: 1, 2, 3 | Right column: 4, 5, 6
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // Left Column: Dots 1, 2, 3
                        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                            PerkinsDotButton(dotNum = 1, active = activeDots.contains(1)) {
                                vibrateShort()
                                activeDots = if (activeDots.contains(1)) activeDots - 1 else activeDots + 1
                            }
                            PerkinsDotButton(dotNum = 2, active = activeDots.contains(2)) {
                                vibrateShort()
                                activeDots = if (activeDots.contains(2)) activeDots - 2 else activeDots + 2
                            }
                            PerkinsDotButton(dotNum = 3, active = activeDots.contains(3)) {
                                vibrateShort()
                                activeDots = if (activeDots.contains(3)) activeDots - 3 else activeDots + 3
                            }
                        }

                        // Preview of current cell
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(
                                text = UrduBrailleEngine.dotsToUnicode(activeDots.toList().sorted()),
                                fontSize = 48.sp,
                                color = MaterialTheme.colorScheme.primary
                            )
                            Text(
                                text = if (activeDots.isEmpty()) "خالی" else "نقاط: ${activeDots.sorted().joinToString(", ")}",
                                style = MaterialTheme.typography.bodySmall
                            )
                        }

                        // Right Column: Dots 4, 5, 6
                        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                            PerkinsDotButton(dotNum = 4, active = activeDots.contains(4)) {
                                vibrateShort()
                                activeDots = if (activeDots.contains(4)) activeDots - 4 else activeDots + 4
                            }
                            PerkinsDotButton(dotNum = 5, active = activeDots.contains(5)) {
                                vibrateShort()
                                activeDots = if (activeDots.contains(5)) activeDots - 5 else activeDots + 5
                            }
                            PerkinsDotButton(dotNum = 6, active = activeDots.contains(6)) {
                                vibrateShort()
                                activeDots = if (activeDots.contains(6)) activeDots - 6 else activeDots + 6
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(14.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Button(
                            onClick = {
                                val cell = BrailleCell(
                                    dots = activeDots.toList().sorted(),
                                    unicode = UrduBrailleEngine.dotsToUnicode(activeDots.toList().sorted()),
                                    display = "",
                                    nameUrdu = "پرکنز سیل",
                                    nameEn = "Perkins Cell"
                                )
                                val urduChar = UrduBrailleEngine.brailleCellsToUrdu(listOf(cell))
                                inputText += urduChar
                                activeDots = emptySet()
                                authRepo.recordPracticeResult(2)
                            },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text("خانہ درج کریں")
                        }

                        OutlinedButton(
                            onClick = {
                                inputText += " "
                                activeDots = emptySet()
                            },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text("فاصلہ (Space)")
                        }

                        IconButton(onClick = { activeDots = emptySet() }) {
                            Icon(Icons.Default.Refresh, contentDescription = "ری سیٹ")
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Braille Unicode Output Display Card
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
            elevation = CardDefaults.cardElevation(4.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "بریل یونیکوڈ نتیجہ (Braille Unicode)",
                        fontWeight = FontWeight.Bold,
                        style = MaterialTheme.typography.titleMedium
                    )

                    Row {
                        IconButton(onClick = {
                            clipboardManager.setText(AnnotatedString(brailleUnicodeOutput))
                            authRepo.syncProgressCloud()
                        }) {
                            Icon(Icons.Default.ContentCopy, contentDescription = "کاپی کریں")
                        }
                        IconButton(onClick = {
                            val reversed = UrduBrailleEngine.brailleCellsToUrdu(translatedCells)
                            inputText = reversed
                        }) {
                            Icon(Icons.Default.SwapVert, contentDescription = "معکوس ترجمہ")
                        }
                    }
                }

                // Braille Unicode Display Text
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
                        .padding(16.dp)
                ) {
                    Text(
                        text = brailleUnicodeOutput.ifEmpty { "⠀" },
                        fontSize = 32.sp,
                        letterSpacing = 4.sp,
                        lineHeight = 44.sp,
                        color = MaterialTheme.colorScheme.primary,
                        textAlign = TextAlign.Start,
                        modifier = Modifier.fillMaxWidth()
                    )
                }

                Spacer(modifier = Modifier.height(14.dp))

                // Interactive Cell Breakdown Stream
                Text(
                    text = "تفصیلی خلیاتی تجزیہ (Cell Inspection - کلک کر کے معائنہ کریں):",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.outline
                )

                Spacer(modifier = Modifier.height(8.dp))

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(rememberScrollState()),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    translatedCells.forEach { cell ->
                        Card(
                            shape = RoundedCornerShape(10.dp),
                            colors = CardDefaults.cardColors(
                                containerColor = if (selectedCell == cell) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant
                            ),
                            modifier = Modifier
                                .clickable {
                                    vibrateShort()
                                    selectedCell = cell
                                }
                                .padding(2.dp)
                        ) {
                            Column(
                                modifier = Modifier.padding(8.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Text(
                                    text = cell.unicode,
                                    fontSize = 24.sp,
                                    color = if (selectedCell == cell) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant
                                )
                                Text(
                                    text = cell.display.ifBlank { "⠀" },
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }
                }

                // Selected Cell Details Card
                selectedCell?.let { cell ->
                    Spacer(modifier = Modifier.height(12.dp))
                    Card(
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(cell.unicode, fontSize = 28.sp, color = MaterialTheme.colorScheme.secondary)
                                Spacer(modifier = Modifier.width(12.dp))
                                Column {
                                    Text(cell.nameUrdu, fontWeight = FontWeight.Bold)
                                    Text(
                                        text = if (cell.dots.isEmpty()) "کوئی نقطہ نہیں (خالی خانہ)" else "نقاط: ${cell.dots.joinToString(", ")}",
                                        style = MaterialTheme.typography.bodySmall
                                    )
                                }
                            }
                            if (cell.rule.isNotEmpty()) {
                                Spacer(modifier = Modifier.height(6.dp))
                                Text(
                                    text = cell.rule,
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.onSecondaryContainer
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun PerkinsDotButton(
    dotNum: Int,
    active: Boolean,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .size(48.dp)
            .clip(CircleShape)
            .background(if (active) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surface)
            .border(2.dp, if (active) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline, CircleShape)
            .clickable { onClick() },
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = "$dotNum",
            color = if (active) MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSurface,
            fontWeight = FontWeight.Bold,
            fontSize = 16.sp
        )
    }
}
