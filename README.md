# Angular Metabolic Pathway Visualization Plugin

This project presents an **Angular-based plugin** for visualizing and analyzing **metabolic networks**, developed as part of a Master’s thesis.

**Author:** Saiyudh Mannan
**Date:** 31.01.25
**Supervisors:** Prof. Dr. Gunter Saake, Prof. Dr.-Ing. Robert Heyer, Emanuel Lange, Daniel Walke

---

## 🎯 Purpose

To create an **interactive and efficient visualization plugin** that enables researchers to explore metabolic pathways across multiple levels — **Molecular**, **Modular**, and **Organelle** — with support for large-scale data.

---

## 💡 Problem Overview

Existing visualization tools are often complex, slow, or difficult to integrate. This plugin addresses:

* Performance and scalability for large graphs.
* Real-time interactivity.
* Clean, modular, and reusable architecture.
* Integration with **MPA-Pathway Tool**.

---

## ⚙️ Core Features

* **Multi-scale visualization:** Molecular and Organelle layers.
* **Interactive controls:** Hover, click, double-click, and context actions.
* **Customizable callbacks** for data exploration.
* **HTML-Canvas rendering** for better performance with up to 10,000 nodes.
* **Angular + D3.js** for modern web-based visualization.

---

## 🧠 Technology Stack

* **Framework:** Angular
* **Visualization:** D3.js (Canvas-based)
* **Deployment:** Docker-compatible
* **Comparison Tools:** Ngx-Graph, GraphViz, Escher

---

## 🧩 Visual Overview

<div align="center">
  <img src="image1.png" alt="Architecture Overview" width="800"/>
  <p><em>Figure 1. Architecture overview of the plugin.</em></p>
</div>

<div align="center">
  <img src="image2.png" alt="UI Mockup" width="800"/>
  <p><em>Figure 2. User Interface mockup showing search bar, toolbar, and visualization panel.</em></p>
</div>

<div align="center">
  <img src="image3.png" alt="Callback Flowchart" width="800"/>
  <p><em>Figure 3. Flow of node interaction events and callback structure.</em></p>
</div>

---

## ⚡ Performance Evaluation

Benchmarks using Chrome DevTools show **HTML-Canvas** outperforms **SVG** when rendering large node networks. As graph size increases:

* **DCL** and **LCP** rise due to Angular’s change detection overhead.
* **Canvas** remains faster for large-scale interactive visualizations.

Compared to Ngx-Graph and GraphViz, the developed plugin loaded 10,000-node networks more efficiently, confirming Canvas’s scalability.

---

## 🚀 Future Work

* Integration with **MPA Pathway Tool backend**.
* Enhanced user customization.
* Exploration of **Graph Neural Networks (GNNs)** for data-driven insights.

---

## 📚 Summary

This project demonstrates that **HTML-Canvas** provides a superior alternative to **SVG** for high-performance, web-based biological network visualization, offering better interactivity, scalability, and integration potential.
