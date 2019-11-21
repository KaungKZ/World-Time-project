const api = "http://worldtimeapi.org/api/timezone";
const select = document.querySelector("#tz");
let timeZones = [];
async function getTime() {
  const response = await fetch(api);
  const data = await response.json();
  timeZones.push(...data);
  const finalOption = timeZones.map(
    zone => `<option value="${zone}">${zone}</option>`
  );

  select.innerHTML = finalOption;
}

getTime();

const options = document.querySelectorAll("option");
const main = document.querySelector(".time");
const div = document.createElement("div");
main.appendChild(div);

select.addEventListener("change", getRealTime);

async function getRealTime() {
  const value = select.value;

  const request = await fetch(`http://worldtimeapi.org/api/timezone/${value}`);
  const response = await request.json();
  const time = response.datetime;
  const newTime = time.split("T")[1].split(".")[0];

  const html = `<p><span class = "location">${select.value}</span> local time is <span class = "currentTime">${newTime}</span></p>`;

  div.innerHTML = html;
}
// (optional) will cause api errors after a few seconds because of requests sent to api every second.

// setInterval(getRealTime, 1000);
