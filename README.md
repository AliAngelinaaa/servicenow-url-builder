# 🔗 ServiceNow URL Builder

A **100% frontend tool** to quickly build ServiceNow data export URLs — no backend, no login, no API token, no fuss.

---

## 🎯 Purpose

This tool helps **ServiceNow users** construct data export URLs using query parameters like filters, columns, sorting, and export format. It eliminates the need to manually build complex query strings, especially for CSV/Excel/XML/JSON exports.

Use it to:

- Save time when building export/reporting links
- Share direct URLs with colleagues or teams
- Simplify debugging or URL-based automation tasks

---

## 🛠 Features

✅ 100% frontend (works offline after loading)  
✅ Build URLs for any table (e.g. `incident`, `problem`, `cmdb_ci`)  
✅ Add unlimited filters  
✅ Choose export format (CSV, Excel, JSON, XML)  
✅ Select columns to display  
✅ Optional sort with ascending/descending  
✅ Copy-to-clipboard support  
✅ Responsive & clean UI  
✅ No authentication required  

---

## 📦 How to Use

1. **Open `index.html`**  
   Open the file in any modern browser.

2. **Fill in the form:**
   - **Organization**: e.g. `acme` for `acme.service-now.com`
   - **Table**: e.g. `incident`
   - **Format**: CSV, Excel, JSON, XML
   - **Filters**: Field, operator, value
   - **Columns**: Comma-separated list like `number,state,short_description`
   - **Sort** (optional): Field name + direction

3. **Click “Generate URL”**  
   The URL will appear in the top field.

4. **Click “Copy”** to copy it to your clipboard.

---

## 🌐 Example

Say you want to get all open incidents assigned to “John Doe”, and export them to CSV:

| Field             | Value              |
|------------------|--------------------|
| Org Name          | `acme`             |
| Table             | `incident`         |
| Filter 1 (field)  | `assigned_to.name` |
| Filter 1 (op)     | `=`                |
| Filter 1 (value)  | `John Doe`         |
| Filter 2 (field)  | `state`            |
| Filter 2 (op)     | `!=`               |
| Filter 2 (value)  | `7` (closed)       |
| Format            | `CSV`              |
| Columns           | `number,state,assigned_to` |

The tool will generate a URL like:

```
https://acme.service-now.com/incident.do?sysparm_query=assigned_to.name=John Doe^state!=7&sysparm_fields=number,state,assigned_to&sysparm_export_format=CSV
```

---

## 🧩 Customization

This tool is 100% open-source and customizable:

- Add authentication (e.g. basic auth or OAuth)
- Add more export options
- Pre-populate default values
- Embed in internal tools

---

## 📁 Files

| File         | Purpose                        |
|--------------|--------------------------------|
| `index.html` | Main app (single page tool)    |
| `README.md`  | This readme                    |

---

## ✅ Requirements

- Modern browser (Chrome, Firefox, Edge, Safari)
- No other dependencies

---

## 📜 License

MIT License — Free to use, fork, and modify.