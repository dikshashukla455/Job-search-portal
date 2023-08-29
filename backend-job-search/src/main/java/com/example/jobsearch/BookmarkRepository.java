package com.example.jobsearch;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
    public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Bookmark findByUserIdAndJobId(String userId, String jobId);
    List<Bookmark> findByUserId(String userId);
    Bookmark findByJobId(String jobId);
        // You can define other custom methods here if needed
    }

