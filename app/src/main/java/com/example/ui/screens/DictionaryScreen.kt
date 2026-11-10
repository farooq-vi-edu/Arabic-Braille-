package com.example.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.braille.BrailleDictEntry
import com.example.braille.UrduBrailleData
import com.example.braille.UrduBrailleEngine
import com.example.data.AuthRepository

@Composable
fun DictionaryScreen(
    authRepo: AuthRepository
) {
    var searchQuery by remember { mutableStateOf("") }
    var filterGrade by remember { mutableStateOf("سب") }
    var reverseDotsQuery by remember { mutableStateOf("") }
    var isReverseSearch by remember { mutableStateOf(false) }

    val progress by authRepo.userProgress.collectAsState()

    val filteredList = remember(searchQuery, filterGrade, reverseDotsQuery, isReverseSearch) {
        UrduBrailleData.DICTIONARY_ENTRIES.filter { entry ->
            val matchesGrade = if (filterGrade == "سب") true else entry.grade.contains(filterGrade)

            if (isReverseSearch) {
                val dotsList = reverseDotsQuery.split(",", " ", "-")
                    .mapNotNull { it.trim().toIntOrNull() }
                    .sorted()
                val matchesDots = if (dotsList.isEmpty()) true else entry.dots.sorted() == dotsList
                matchesGrade && matchesDots
            } else {
                val matchesSearch = if (searchQuery.isBlank()) true else {
                    entry.urdu.contains(searchQuery, ignoreCase = true) ||
                            entry.description.contains(searchQuery, ignoreCase = true) ||
                            entry.unicode.contains(searchQuery)
                }
                matchesGrade && matchesSearch
            }
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Search Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedTextField(
                value = if (isReverseSearch) reverseDotsQuery else searchQuery,
                onValueChange = {
                    if (isReverseSearch) reverseDotsQuery = it else searchQuery = it
                },
                label = { Text(if (isReverseSearch) "نقاط سے تلاش کریں (مثلاً: 2, 3, 5, 6)" else "اردو لفظ یا حرف تلاش کریں...") },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                trailingIcon = {
                    IconButton(onClick = { isReverseSearch = !isReverseSearch }) {
                        Icon(
                            imageVector = if (isReverseSearch) Icons.Default.FormatListNumbered else Icons.Default.Abc,
                            contentDescription = "تلاش کا طریقہ بدلیں"
                        )
                    }
                },
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(14.dp),
                singleLine = true
            )
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Grade Filter Chips
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            FilterChip(
                selected = filterGrade == "سب",
                onClick = { filterGrade = "سب" },
                label = { Text("تمام (All)") }
            )
            FilterChip(
                selected = filterGrade == "اول",
                onClick = { filterGrade = "اول" },
                label = { Text("درجہ اول") }
            )
            FilterChip(
                selected = filterGrade == "دوم",
                onClick = { filterGrade = "دوم" },
                label = { Text("درجہ دوم") }
            )
            FilterChip(
                selected = filterGrade == "قرآنی",
                onClick = { filterGrade = "قرآنی" },
                label = { Text("قرآنی بریل") }
            )
        }

        Spacer(modifier = Modifier.height(12.dp))

        Text(
            text = "نتائج (${filteredList.size}):",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.outline
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Entries List
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            items(filteredList, key = { it.id }) { entry ->
                val isBookmarked = progress.bookmarkedWords.contains(entry.id)
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    elevation = CardDefaults.cardElevation(2.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(14.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // Big Braille cell glyph
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = MaterialTheme.colorScheme.primaryContainer,
                            modifier = Modifier.size(54.dp)
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Text(
                                    text = entry.unicode,
                                    fontSize = 32.sp,
                                    color = MaterialTheme.colorScheme.primary
                                )
                            }
                        }

                        Spacer(modifier = Modifier.width(14.dp))

                        Column(modifier = Modifier.weight(1f)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = entry.urdu,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 18.sp
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                SuggestionChip(
                                    onClick = {},
                                    label = { Text(entry.grade, fontSize = 10.sp) },
                                    modifier = Modifier.height(24.dp)
                                )
                            }

                            Spacer(modifier = Modifier.height(2.dp))

                            Text(
                                text = "نقاط: ${entry.dots.joinToString(", ")}  |  ${entry.description}",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.outline
                            )
                        }

                        IconButton(onClick = { authRepo.toggleBookmarkWord(entry.id) }) {
                            Icon(
                                imageVector = if (isBookmarked) Icons.Default.Bookmark else Icons.Default.BookmarkBorder,
                                contentDescription = if (isBookmarked) "محفوظ شدہ" else "بک مارک کریں",
                                tint = if (isBookmarked) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline
                            )
                        }
                    }
                }
            }
        }
    }
}
