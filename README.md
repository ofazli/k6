# k6 Load Testing Examples

Load testing scripts and examples written with [Grafana k6](https://k6.io/). Covers practical examples from basic concepts to scenario-based tests, custom metrics, and threshold definitions.

## Requirements

- [k6](https://k6.io/docs/get-started/installation/) must be installed

```bash
# macOS (Homebrew)
brew install k6

# Linux (deb/rpm)
# https://k6.io/docs/get-started/installation/
```

## Project Structure

| File / Folder | Description |
|---------------|-------------|
| `first-script.js` | Getting started: simple GET request and VU/duration options |
| `load-test.js` | Staged load test example |
| `stress-test.js` | Stress test |
| `soak-test.js` | Soak (endurance) test |
| `spike-test.js` | Spike test |
| `smoke-test.js` | Smoke test |
| `breakpoint-test.js` | Breakpoint test |
| `lifecycle.js` | `setup` / `teardown` and VU lifecycle |
| `scenarious.js` | Scenarios and threshold examples |
| `assertions.js` | Using assertions with `check()` |
| `definingThresholdsGroups.js` | Threshold groups |
| `settingThresholds.js` | Defining thresholds |
| `customMetrics.js` / `custom-metrics.js` | Custom metrics |
| `customTags.js` / `tags.js` | Tag usage |
| `validationResponses.js` | Response validation |
| `organizRequestGroups.js` | Request groups |
| `requests/` | HTTP method examples (GET, POST, PUT, PATCH, DELETE) |

## Quick Start

Run a simple script:

```bash
k6 run first-script.js
```

Staged load test:

```bash
k6 run load-test.js
```

Stress test:

```bash
k6 run stress-test.js
```

## Debug Mode

To inspect HTTP requests in detail:

```bash
# Basic debug
k6 run --http-debug requests/getRequests.js

# Include response body
k6 run --http-debug="full" requests/getRequests.js
```

## Topics Covered

- **VUs and duration**: `options.vus`, `options.duration`
- **Stages**: Gradual load ramp-up and ramp-down
- **Thresholds**: `http_req_duration`, `http_req_failed`, `checks`, etc.
- **Checks**: Validating status codes and response content with `check()`
- **Setup/Teardown**: Pre- and post-test logic
- **Custom metrics**: `Trend`, `Counter`, `Rate` examples
- **Tags**: Tagging requests and metrics

## Resources

- [k6 Documentation](https://k6.io/docs/)
- [k6 Metrics Reference](https://grafana.com/docs/k6/latest/using-k6/metrics/reference/)
- [k6 Installation](https://k6.io/docs/get-started/installation/)

## License

This repository contains example scripts for learning and reference.
