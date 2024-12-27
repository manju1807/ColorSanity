// src/utils/web-vitals.ts
import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';
import type { Metric } from 'web-vitals';

// Define analytics interface
interface AnalyticsOptions {
  debug?: boolean;
  reportUri?: string;
}

// Define metric handler type
type MetricHandler = (metric: Metric) => void;

export class WebVitalsReporter {
  private debug: boolean;
  private reportUri: string;

  constructor(options: AnalyticsOptions = {}) {
    this.debug = options.debug || false;
    this.reportUri = options.reportUri || '/api/vitals';
  }

  // Handle metrics reporting
  private handleMetric: MetricHandler = async (metric: Metric) => {
    if (this.debug) {
      console.log('[Web Vitals]:', metric);
    }

    const body = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
      valueDisplay: `${Math.round(metric.value * 10) / 10} ${metric.name === 'CLS' ? '' : 'ms'}`,
    };

    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
        navigator.sendBeacon(this.reportUri, blob);
      } else {
        await fetch(this.reportUri, {
          body: JSON.stringify(body),
          method: 'POST',
          keepalive: true,
        });
      }
    } catch (error) {
      console.error('[Web Vitals] Error reporting metrics:', error);
    }
  };

  // Initialize all metrics monitoring
  public initMetrics(): void {
    // Core Web Vitals
    onCLS(this.handleMetric);  // Cumulative Layout Shift
    onFID(this.handleMetric);  // First Input Delay
    onLCP(this.handleMetric);  // Largest Contentful Paint

    // Additional Web Vitals
    onFCP(this.handleMetric);  // First Contentful Paint
    onTTFB(this.handleMetric); // Time to First Byte
    onINP(this.handleMetric);  // Interaction to Next Paint
  }

  // Helper to format metrics for display
  public static formatMetricValue(value: number, metric: string): string {
    return metric === 'CLS' ? value.toFixed(3) : `${Math.round(value)} ms`;
  }
}
