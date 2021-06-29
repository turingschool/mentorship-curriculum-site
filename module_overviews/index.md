---
layout: page
title: Module Overviews
---

<section class="module-overview-button-container">
  {% for item in site.data.module_overview %}
    <button
      class="btn btn-dark module-selector"
      data-module="{{ item.id }}"
      data-file="{{ item.file }}"
      type="button"
    >
      {{ item.title }}
    </button>
  {% endfor %}
</section>

<p>
  <br>
</p>

---

<div id="content-container"></div>

<script src="/public/js/module-selectors.js"></script>
