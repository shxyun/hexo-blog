---
title: Content Components Toolbox
date: 2026-10-10T10:00:00+08:00
tags: [Toolbox, Guide]
categories: [Guide]
lang: en
---

This page demonstrates **every content component** available on this site. When writing a post, copy the markup from any code block below, paste it into your Markdown draft, and replace the sample values with your own. All components support light and dark mode.

## 1. Product / Resource Card

A mobile-friendly card for course recommendations, books, gear reviews or any affiliate product. The outbound link is automatically tagged with `rel="nofollow sponsored noopener"`.

**Syntax:**

{% raw %}
```
{% product img="https://example.com/cover.jpg" badge="Best Course" title="Course Name" desc="A one-line description." old="$89.99" price="$19.99" rating="4.8" link="https://example.com/" btn="Start Learning" %}
```
{% endraw %}

All parameters except `title` and `link` are optional. `badge`, `old` (strikethrough price), and `rating` can be omitted.

**Result:**

{% product img="/images/shortcodes-demo-course.jpg" badge="Best Course" title="Complete Python Bootcamp 2026" desc="From absolute beginner to building real projects — 32 hours of video, 12 quizzes and a certificate." old="$89.99" price="$19.99" rating="4.8" link="https://www.udemy.com/" btn="Start Learning" %}

{% alert type="info" title="Affiliate disclosure" %}
If you earn commissions, add a short FTC-style disclosure near the card, for example: *"This post contains affiliate links and I may earn a small commission at no cost to you."*
{% endalert %}

## 2. Coupon Code

A one-click copyable coupon or promo code — a familiar pattern for online-course sales and software deals.

**Syntax:**

{% raw %}
```
{% coupon code="STUDY20" title="20% off all courses" note="Enter the code at checkout. Click to copy." %}
```
{% endraw %}

**Result:**

{% coupon code="STUDY20" title="20% off all courses" note="Enter the code at checkout. Click to copy." %}

## 3. Download Card

A resource card for Google Drive, Dropbox, OneDrive, MEGA, Gumroad, GitHub, iCloud, MediaFire, TeraBox or a direct link. Each platform gets its own brand-colored badge.

**Syntax:**

{% raw %}
```
{% drive platform="Google Drive" name="Python Cheat Sheet (PDF, 3 MB)" url="https://drive.google.com/" code="AB12-CD34" %}
```
{% endraw %}

Parameters: `platform` (drives the badge color), `name`, `url`, `code` (optional access code), `btn` (optional, defaults to **Download**).

**Result:**

{% drive platform="Google Drive" name="Python Cheat Sheet (PDF, 3 MB)" url="https://drive.google.com/" code="AB12-CD34" %}

{% drive platform="GitHub" name="Practice repository" url="https://github.com/" %}

## 4. YouTube Video

Pass either a video `id` or a full `url`. The player is responsive (16:9).

**Syntax:**

{% raw %}
```
{% youtube id="jNQXAC9IVRw" title="Me at the zoo" %}
```
{% endraw %}

**Result:**

{% youtube id="jNQXAC9IVRw" title="Me at the zoo" %}

## 5. Spotify Player

Embed a focus-music `track`, `album`, `playlist`, `episode` or `show`. The ID is the last part of the Spotify share URL — perfect for "study music" posts.

**Syntax:**

{% raw %}
```
{% spotify type="playlist" id="37i9dQZF1DXcBWIGoYBM5M" %}
```
{% endraw %}

**Result:**

{% spotify type="playlist" id="37i9dQZF1DXcBWIGoYBM5M" %}

## 6. Local Video and Audio

Put media files in your `source/media/` folder (for example `source/media/demo.mp4`) and reference them with an absolute path. Audio files (`.mp3`, `.m4a`, `.wav`, `.ogg`, `.aac`, `.flac`) render as an audio player automatically.

**Syntax:**

{% raw %}
```
{% video src="/media/demo.mp4" poster="/media/poster.jpg" %}
{% video src="/media/demo.mp3" %}
```
{% endraw %}

**Result (hosted samples used for demonstration):**

{% video src="https://media.w3.org/2010/05/sintel/trailer.mp4" %}

{% video src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" %}

{% alert type="warning" title="Tip" %}
Avoid committing large media files to Git — repositories quickly become slow. Host big videos on YouTube and embed them instead.
{% endalert %}

## 7. Callout Boxes

Highlight notes, warnings, tips or successes. Types: `info`, `success`, `warning`, `error`.

**Syntax:**

{% raw %}
```
{% alert type="warning" title="Heads up" %}
This is the callout body. **Markdown is supported.**
{% endalert %}
```
{% endraw %}

**Result:**

{% alert type="info" title="Note" %}
This is a neutral info callout.
{% endalert %}

{% alert type="success" title="Correct" %}
Your solution passes all test cases.
{% endalert %}

{% alert type="warning" %}
A warning without a title.
{% endalert %}

{% alert type="error" title="Common pitfall" %}
Off-by-one errors happen here — remember that range endpoints are exclusive.
{% endalert %}

## 8. Collapsible Block (FAQ)

A native `<details>` block, ideal for FAQ sections or optional extra detail. Add `open="true"` to expand it by default.

**Syntax:**

{% raw %}
```
{% collapse title="Do I need prior experience?" %}
No — the beginner track starts from zero.
{% endcollapse %}
```
{% endraw %}

**Result:**

{% collapse title="Do I need prior experience?" %}
No. The beginner track starts from zero and every lesson builds on the previous one.
{% endcollapse %}

{% collapse title="How long do I keep access?" %}
Forever. Once enrolled, all materials — including future updates — stay available on your account.
{% endcollapse %}

## 9. Newsletter Form

A Buttondown-powered subscribe box so readers get new notes and resources in their inbox.

**Syntax:**

{% raw %}
```
{% subscribe %}
```
{% endraw %}

Optional parameters: `title`, `desc`, `ph` (placeholder), `btn`.

**Result:**

{% subscribe %}

---

That is the full toolbox. New components will be added to this page as they are built.
