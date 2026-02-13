package com.aurahealth.health.repository;

import com.aurahealth.health.model.HealthMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthMetricRepository extends JpaRepository<HealthMetric, Long> {
    List<HealthMetric> findByUserId(String userId);

    List<HealthMetric> findByUserIdAndType(String userId, HealthMetric.MetricType type);
}
