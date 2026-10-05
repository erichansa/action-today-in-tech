# Today in Tech History (GitHub Action)

> Automatically update your GitHub Profile README (or project README) with today's historical technology milestone, verified engineering archives, and breakthroughs. Powered by [Useful Finds Daily](https://www.useful-finds-daily.com).

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Today%20in%20Tech-blue.svg?colorA=24292e&colorB=0366d6&style=flat&logo=github)](https://github.com/marketplace/actions/today-in-tech-history)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Powered By](https://img.shields.io/badge/Data-Useful%20Finds%20Daily-emerald.svg)](https://www.useful-finds-daily.com)

---

## ⚡ Live Preview in your README

When this action runs, it injects a beautiful markdown card directly into your README:

```markdown
### ⚡ Today in Tech History (OCTOBER 4, 1957)

**The Beep That Started Everything: How a 23-Inch Polished Aluminum Sphere Launched the Space Age and Created NASA**

> Before October 4, 1957, outer space belonged to science fiction. When an 83.6-kilogram polished aluminum sphere began transmitting its rhythmic 20-megahertz pulse from orbit, it triggered a geopolitical shockwave, created NASA and DARPA, and ignited the modern technological race.

👉 [Read the full verified engineering history on Useful Finds Daily](https://www.useful-finds-daily.com/on-this-day/sputnik-1-launch-october-4-1957) · *Data provided by Useful Finds Daily Archive*
```

---

## 🚀 How to Use

### 1. Add Placeholders to your `README.md`

Add the following comment tags wherever you want the tech milestone to appear:

```markdown
<!-- TODAY-IN-TECH:START -->
<!-- TODAY-IN-TECH:END -->
```

### 2. Create Workflow `.github/workflows/today-in-tech.yml`

Create a new workflow file in your repository:

```yaml
name: Update Today in Tech History

on:
  schedule:
    # Runs every day at 06:00 UTC
    - cron: '0 6 * * *'
  workflow_dispatch: # Allows manual trigger

permissions:
  contents: write

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Update Tech History
        uses: erichansa/action-today-in-tech@v1

      - name: Commit changes
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git add README.md
          git diff --quiet && git diff --staged --quiet || git commit -m "docs: update today in tech history"
          git push
```

---

## ⚙️ Options & Inputs

| Input | Description | Default |
| :--- | :--- | :--- |
| `readme-path` | Path to the markdown file to update | `README.md` |
| `tag-start` | Opening comment placeholder tag | `<!-- TODAY-IN-TECH:START -->` |
| `tag-end` | Closing comment placeholder tag | `<!-- TODAY-IN-TECH:END -->` |

---

## 📚 About Useful Finds Daily

[Useful Finds Daily](https://www.useful-finds-daily.com) is an independent publication curating primary-source technology history alongside genuine, practical problem-solving product buying guides.

- 🌐 [Official Website](https://www.useful-finds-daily.com)
- 🚀 [Today in Tech Archive](https://www.useful-finds-daily.com/on-this-day)
- 🛠️ [Hardware Launch Radar](https://www.useful-finds-daily.com/launch-radar)

---

## 📄 License

MIT © [Useful Finds Daily](https://www.useful-finds-daily.com)
