package com.example.jobsearch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {
    @Autowired
    private BookmarkRepository bookmarkRepository;

    @PostMapping("/toggle")
    public ResponseEntity<String> toggleBookmark(@RequestBody Bookmark bookmarkRequest) {
        String userId = bookmarkRequest.getUserId();
        String jobId = bookmarkRequest.getJobId();



        // Check if the bookmark already exists
        Bookmark existingBookmark = bookmarkRepository.findByUserIdAndJobId(userId, jobId);

        if (existingBookmark != null) {
            bookmarkRepository.delete(existingBookmark);
            return ResponseEntity.ok("Bookmark removed successfully");
        } else {


            Bookmark newBookmark = new Bookmark();
            newBookmark.setUserId(userId);
            newBookmark.setJobId(jobId);
            newBookmark.setJobTitle(bookmarkRequest.getJobTitle());
            newBookmark.setJobLocation(bookmarkRequest.getJobLocation());
            newBookmark.setJobLink(bookmarkRequest.getJobLink());
            bookmarkRepository.save(newBookmark);
            return ResponseEntity.ok("Bookmark added successfully");
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Bookmark>> getBookmarks(@PathVariable String userId) {
        String decodedUserId = UriUtils.decode(userId, StandardCharsets.UTF_8);
        List<Bookmark> bookmarks = bookmarkRepository.findByUserId(decodedUserId);

        List<Bookmark> bookmarkedJobs = bookmarks.stream()
                .map(bookmark -> {
                    Bookmark dto = new Bookmark();
                    dto.setJobId(bookmark.getJobId());
                    // Fetch additional job information based on jobId
                    Bookmark job = bookmarkRepository.findByJobId(bookmark.getJobId());
                    dto.setJobTitle(job.getJobTitle());
                    dto.setJobLocation(job.getJobLocation());
                    dto.setJobLink(job.getJobLink());
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(bookmarkedJobs);
    }
    @DeleteMapping
    public ResponseEntity<String> removeBookmark(@RequestBody Bookmark bookmarkRequest) {
        String userId = bookmarkRequest.getUserId();
        String jobId = bookmarkRequest.getJobId();

        Bookmark existingBookmark = bookmarkRepository.findByUserIdAndJobId(userId, jobId);

        if (existingBookmark != null) {
            bookmarkRepository.delete(existingBookmark);
            return ResponseEntity.ok("Bookmark removed successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
