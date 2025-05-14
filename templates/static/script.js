function addFilter() {
    const filtersDiv = document.getElementById("filters");
    const div = document.createElement("div");
    div.classList = "row g-2 filter-row mb-2";
    div.innerHTML = `
      <div class="col-md-4">
        <input class="form-control" placeholder="Field" name="filter_field[]">
      </div>
      <div class="col-md-4">
        <select class="form-select" name="filter_op[]">
          <option value="=">Equals (=)</option>
          <option value="!=">Not Equal (!=)</option>
          <option value="LIKE">Like</option>
          <option value="STARTSWITH">Starts With</option>
          <option value="ENDSWITH">Ends With</option>
        </select>
      </div>
      <div class="col-md-4">
        <input class="form-control" placeholder="Value" name="filter_value[]">
      </div>
    `;
    filtersDiv.appendChild(div);
  }
  
  document.getElementById("urlForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = new FormData(this);
  
    // Auto-generate full domain
    const orgName = form.get("orgName").trim();
    form.delete("orgName");
    form.append("domain", `${orgName}.service-now.com`);
  
    // Compile filters
    const filters = [];
    const fields = form.getAll("filter_field[]");
    const ops = form.getAll("filter_op[]");
    const values = form.getAll("filter_value[]");
    for (let i = 0; i < fields.length; i++) {
      if (fields[i] && ops[i] && values[i]) {
        filters.push(`${fields[i]}${ops[i]}${values[i]}`);
      }
    }
    form.delete("filter_field[]");
    form.delete("filter_op[]");
    form.delete("filter_value[]");
    filters.forEach(f => form.append("filters[]", f));
  
    // Send to backend
    const response = await fetch("/generate", {
      method: "POST",
      body: form
    });
  
    const result = await response.json();
    document.getElementById("generatedURL").value = result.url;
    document.getElementById("copySuccess").classList.add("d-none");
  });
  
  function copyURL() {
    const urlBox = document.getElementById("generatedURL");
    navigator.clipboard.writeText(urlBox.value).then(() => {
      const success = document.getElementById("copySuccess");
      success.classList.remove("d-none");
      setTimeout(() => success.classList.add("d-none"), 2000);
    });
  }