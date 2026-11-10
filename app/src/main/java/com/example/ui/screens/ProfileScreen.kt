package com.example.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.AuthProvider
import com.example.data.AuthRepository
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

@Composable
fun ProfileScreen(
    authRepo: AuthRepository,
    onOpenAuthModal: () -> Unit
) {
    val currentUser by authRepo.currentUser.collectAsState()
    val progress by authRepo.userProgress.collectAsState()
    val syncMessage by authRepo.syncMessage.collectAsState()
    var showDeleteConfirm by remember { mutableStateOf(false) }

    val formattedDate = remember(progress.lastSyncTimestamp) {
        val sdf = SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.getDefault())
        sdf.format(Date(progress.lastSyncTimestamp))
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Top Sync Banner
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(
                containerColor = if (currentUser.isGuest) MaterialTheme.colorScheme.tertiaryContainer else MaterialTheme.colorScheme.primaryContainer
            ),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = if (currentUser.isGuest) Icons.Default.CloudQueue else Icons.Default.CloudDone,
                    contentDescription = null,
                    tint = if (currentUser.isGuest) MaterialTheme.colorScheme.onTertiaryContainer else MaterialTheme.colorScheme.onPrimaryContainer,
                    modifier = Modifier.size(32.dp)
                )
                Spacer(modifier = Modifier.width(12.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = if (currentUser.isGuest) "مہمان موڈ فعال ہے" else "پیشرفت کلاؤڈ پر محفوظ ہو چکی ہے",
                        fontWeight = FontWeight.Bold,
                        style = MaterialTheme.typography.bodyLarge,
                        color = if (currentUser.isGuest) MaterialTheme.colorScheme.onTertiaryContainer else MaterialTheme.colorScheme.onPrimaryContainer
                    )
                    Text(
                        text = if (currentUser.isGuest)
                            "اکاؤنٹ منسلک کریں تاکہ آپ کا ریکارڈ اور لغت محفوظ رہے"
                        else
                            "آخری ہم آہنگی (Sync): $formattedDate",
                        style = MaterialTheme.typography.bodySmall,
                        color = if (currentUser.isGuest) MaterialTheme.colorScheme.onTertiaryContainer.copy(alpha = 0.8f) else MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.8f)
                    )
                }
                if (currentUser.isGuest) {
                    Button(
                        onClick = onOpenAuthModal,
                        shape = RoundedCornerShape(10.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
                    ) {
                        Text("منسلک کریں")
                    }
                } else {
                    IconButton(onClick = { authRepo.syncProgressCloud() }) {
                        Icon(Icons.Default.Sync, contentDescription = "ہم آہنگ کریں")
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Avatar and Profile Info Card
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(20.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Box(
                    modifier = Modifier
                        .size(80.dp)
                        .clip(CircleShape)
                        .background(
                            when (currentUser.provider) {
                                AuthProvider.GOOGLE -> Color(0xFFEA4335)
                                AuthProvider.FACEBOOK -> Color(0xFF1877F2)
                                else -> MaterialTheme.colorScheme.primary
                            }
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = currentUser.displayName.take(1).uppercase(),
                        color = Color.White,
                        fontSize = 32.sp,
                        fontWeight = FontWeight.Bold
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                Text(
                    text = currentUser.displayName,
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                Text(
                    text = currentUser.email,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.outline
                )

                Spacer(modifier = Modifier.height(10.dp))

                // Provider Badge
                AssistChip(
                    onClick = {},
                    label = {
                        Text(
                            when (currentUser.provider) {
                                AuthProvider.GOOGLE -> "منسلک بذریعہ گوگل (Google Verified)"
                                AuthProvider.FACEBOOK -> "منسلک بذریعہ فیس بک (Facebook Verified)"
                                AuthProvider.EMAIL -> "تصدیق شدہ ای میل اکاؤنٹ (Email Verified)"
                                AuthProvider.GUEST -> "غیر تصدیق شدہ (مہمان)"
                            }
                        )
                    },
                    leadingIcon = {
                        Icon(
                            imageVector = when (currentUser.provider) {
                                AuthProvider.GOOGLE -> Icons.Default.CheckCircle
                                AuthProvider.FACEBOOK -> Icons.Default.ThumbUp
                                AuthProvider.EMAIL -> Icons.Default.Email
                                AuthProvider.GUEST -> Icons.Default.Person
                            },
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.primary
                        )
                    }
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Progress Statistics Grid
        Text(
            text = "تعلیمی پیشرفت و کارکردگی (Learning Analytics)",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Start
        )

        Spacer(modifier = Modifier.height(10.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Card(
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Icon(Icons.Default.Star, contentDescription = null, tint = Color(0xFFFFB300), modifier = Modifier.size(28.dp))
                    Spacer(modifier = Modifier.height(6.dp))
                    Text("${progress.practiceScore}", fontWeight = FontWeight.Bold, fontSize = 22.sp)
                    Text("کل اسکور", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.outline)
                }
            }

            Card(
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Icon(Icons.Default.LocalFireDepartment, contentDescription = null, tint = Color(0xFFFF5722), modifier = Modifier.size(28.dp))
                    Spacer(modifier = Modifier.height(6.dp))
                    Text("${progress.dailyStreak} دن", fontWeight = FontWeight.Bold, fontSize = 22.sp)
                    Text("مسلسل مشق (Streak)", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.outline)
                }
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Card(
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Icon(Icons.Default.Bookmark, contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(28.dp))
                    Spacer(modifier = Modifier.height(6.dp))
                    Text("${progress.bookmarkedRules.size + progress.bookmarkedWords.size}", fontWeight = FontWeight.Bold, fontSize = 22.sp)
                    Text("محفوظ نشانات و قواعد", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.outline)
                }
            }

            Card(
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Icon(Icons.Default.School, contentDescription = null, tint = Color(0xFF00897B), modifier = Modifier.size(28.dp))
                    Spacer(modifier = Modifier.height(6.dp))
                    Text("${progress.completedLessons.size}", fontWeight = FontWeight.Bold, fontSize = 22.sp)
                    Text("مکمل اسباق", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.outline)
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Account Management Actions
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                if (currentUser.isGuest) {
                    Button(
                        onClick = onOpenAuthModal,
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Icon(Icons.Default.AccountCircle, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("اکاؤنٹ بنائیں یا لاگ ان کریں")
                    }
                } else {
                    OutlinedButton(
                        onClick = { authRepo.logout() },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Icon(Icons.Default.ExitToApp, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("لاگ آؤٹ کریں (Logout)")
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    TextButton(
                        onClick = { showDeleteConfirm = true },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.textButtonColors(contentColor = MaterialTheme.colorScheme.error)
                    ) {
                        Icon(Icons.Default.DeleteForever, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("اکاؤنٹ اور ڈیٹا مستقل حذف کریں (Delete Account)")
                    }
                }
            }
        }

        // Delete Account Confirmation Dialog
        if (showDeleteConfirm) {
            AlertDialog(
                onDismissRequest = { showDeleteConfirm = false },
                title = { Text("کیا آپ واقعی اکاؤنٹ حذف کرنا چاہتے ہیں؟") },
                text = { Text("یہ عمل ناقابلِ واپسی ہے۔ آپ کی تمام تعلیمی پیشرفت، محفوظ الفاظ اور کلاؤڈ ریکارڈز مستقل طور پر مٹ جائیں گے۔") },
                confirmButton = {
                    Button(
                        onClick = {
                            showDeleteConfirm = false
                            authRepo.deleteAccount()
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.error)
                    ) {
                        Text("ہاں، مستقل حذف کریں")
                    }
                },
                dismissButton = {
                    TextButton(onClick = { showDeleteConfirm = false }) {
                        Text("منسوخ کریں")
                    }
                }
            )
        }
    }
}
