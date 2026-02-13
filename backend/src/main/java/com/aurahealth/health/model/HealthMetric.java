package com.aurahealth.health.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "health_metrics")
public class HealthMetric {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MetricType type;

    @NotNull
    @Positive(message = "Value must be positive")
    @Column(name = "metric_value", nullable = false)
    private Double value;

    @NotBlank
    private String unit;

    @NotNull
    @Column(name = "measured_at", nullable = false)
    private LocalDateTime measuredAt;

    @Column(name = "source")
    private String source = "MANUAL";

    @AssertTrue(message = "Heart rate must be between 30 and 220 BPM")
    private boolean isHeartRateValid() {
        if (type == MetricType.HEART_RATE) {
            return value >= 30 && value <= 220;
        }
        return true;
    }

    @AssertTrue(message = "Daily steps cannot exceed 100,000 realistically")
    private boolean isStepsValid() {
        if (type == MetricType.STEPS) {
            return value >= 0 && value <= 100000;
        }
        return true;
    }

    public enum MetricType {
        HEART_RATE, STEPS, SLEEP, WEIGHT
    }

    public HealthMetric() {
    }

    public HealthMetric(Long id, Long userId, MetricType type, Double value, String unit, LocalDateTime measuredAt,
            String source) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.value = value;
        this.unit = unit;
        this.measuredAt = measuredAt;
        this.source = source != null ? source : "MANUAL";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public MetricType getType() {
        return type;
    }

    public void setType(MetricType type) {
        this.type = type;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public LocalDateTime getMeasuredAt() {
        return measuredAt;
    }

    public void setMeasuredAt(LocalDateTime measuredAt) {
        this.measuredAt = measuredAt;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public static HealthMetricBuilder builder() {
        return new HealthMetricBuilder();
    }

    public static class HealthMetricBuilder {
        private Long id;
        private Long userId;
        private MetricType type;
        private Double value;
        private String unit;
        private LocalDateTime measuredAt;
        private String source = "MANUAL";

        HealthMetricBuilder() {
        }

        public HealthMetricBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public HealthMetricBuilder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public HealthMetricBuilder type(MetricType type) {
            this.type = type;
            return this;
        }

        public HealthMetricBuilder value(Double value) {
            this.value = value;
            return this;
        }

        public HealthMetricBuilder unit(String unit) {
            this.unit = unit;
            return this;
        }

        public HealthMetricBuilder measuredAt(LocalDateTime measuredAt) {
            this.measuredAt = measuredAt;
            return this;
        }

        public HealthMetricBuilder source(String source) {
            this.source = source;
            return this;
        }

        public HealthMetric build() {
            return new HealthMetric(id, userId, type, value, unit, measuredAt, source);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        HealthMetric that = (HealthMetric) o;
        return Objects.equals(id, that.id) && Objects.equals(userId, that.userId) && type == that.type
                && Objects.equals(measuredAt, that.measuredAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, type, measuredAt);
    }

    @Override
    public String toString() {
        return "HealthMetric{" +
                "id=" + id +
                ", userId=" + userId +
                ", type=" + type +
                ", value=" + value +
                ", unit='" + unit + '\'' +
                ", measuredAt=" + measuredAt +
                '}';
    }
}
