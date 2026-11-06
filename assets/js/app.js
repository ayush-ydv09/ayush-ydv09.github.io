(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;
  try { if (localStorage.getItem("ay-theme") === "light") root.dataset.theme = "light"; } catch (_) {}
  $("themeToggle").addEventListener("click", () => {
    const light = root.dataset.theme !== "light";
    if (light) root.dataset.theme = "light"; else delete root.dataset.theme;
    try { localStorage.setItem("ay-theme", light ? "light" : "dark"); } catch (_) {}
  });
  $("menuToggle").addEventListener("click", () => {
    const nav = $("navLinks"), open = nav.classList.toggle("open");
    $("menuToggle").setAttribute("aria-expanded", String(open));
  });
  $("navLinks").querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    $("navLinks").classList.remove("open"); $("menuToggle").setAttribute("aria-expanded", "false");
  }));
  $("year").textContent = new Date().getFullYear();

  const log = $("serialLog");
  function addLog(message) {
    const p = document.createElement("p");
    p.textContent = new Date().toLocaleTimeString("en-GB") + " " + message;
    log.append(p);
    while (log.children.length > 30) log.firstElementChild.remove();
    log.scrollTop = log.scrollHeight;
  }
  const adc = $("adcControl");
  function updateAdc() {
    const raw = Number(adc.value), volts = raw / 4095 * 3.3;
    $("adcValue").textContent = raw.toLocaleString("en-IN");
    $("adcVoltage").textContent = volts.toFixed(3) + " V / 3.300 V reference";
    $("adcPercent").textContent = (raw / 4095 * 100).toFixed(1) + "%";
    $("adcBar").style.width = (raw / 4095 * 100) + "%";
  }
  adc.addEventListener("input", updateAdc); updateAdc();

  const waveType = $("waveType"), freq = $("freqControl"), amp = $("ampControl"), duty = $("pwmControl");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let phase = 0;
  function drawWave() {
    const type = waveType.value, f = Number(freq.value), a = Number(amp.value), d = Number(duty.value);
    $("freqValue").textContent = f.toFixed(1) + " kHz";
    $("ampValue").textContent = a.toFixed(1) + " V";
    $("pwmPercent").textContent = d + "%";
    $("scopeFreq").textContent = f.toFixed(1) + " kHz";
    $("scopeAmplitude").textContent = a.toFixed(1) + " Vpp";
    const points = [];
    for (let x = 0; x <= 320; x += 2) {
      const t = (x / 320 * 2 * Math.PI * Math.max(1, Math.min(f, 4))) + phase;
      let v;
      if (type === "square") v = Math.sin(t) >= 0 ? 1 : -1;
      else if (type === "pwm") v = ((x / 320 * 100) % 100) < d ? 1 : -1;
      else v = Math.sin(t);
      const y = 50 - v * (a / 3.3) * 36;
      points.push((x === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1));
    }
    $("scopePath").setAttribute("d", points.join(" "));
    $("waveDescription").textContent = type.toUpperCase() + " waveform, " + f.toFixed(1) + " kilohertz, " + a.toFixed(1) + " volts peak-to-peak";
  }
  [waveType,freq,amp,duty].forEach(el => el.addEventListener("input", () => { drawWave(); }));
  drawWave();
  if (!reduceMotion) {
    const tick = () => { phase += .035; drawWave(); window.requestAnimationFrame(tick); };
    window.requestAnimationFrame(tick);
  }
  $("sendWaveLog").addEventListener("click", () => addLog("SCOPE " + waveType.value.toUpperCase() + " f=" + freq.value + "kHz amp=" + amp.value + "V duty=" + duty.value + "%"));

  document.querySelectorAll(".pin-toggle").forEach(btn => btn.addEventListener("click", () => {
    const high = btn.getAttribute("aria-pressed") !== "true";
    btn.setAttribute("aria-pressed", String(high));
    btn.querySelector(".pin-state").textContent = high ? "HIGH" : "LOW";
    addLog(btn.dataset.pin + " -> " + (high ? "HIGH" : "LOW"));
  }));
  $("baudRate").addEventListener("change", e => addLog("UART baud rate configured: " + e.target.value));
  $("sendUart").addEventListener("click", () => addLog("TX: Ayush / firmware console test frame"));
  $("clearTerminal").addEventListener("click", () => { log.replaceChildren(); addLog("Terminal cleared · session active"); });

  // Browser-generated demo telemetry. It is deliberately labelled simulated.
  const initial = {temp:27.4,humidity:58.2,battery:3.91,gas:1240};
  let sensorTick = 0;
  function updateSensors() {
    sensorTick++;
    const temp = initial.temp + Math.sin(sensorTick / 5) * .7;
    const humidity = initial.humidity + Math.cos(sensorTick / 7) * 1.8;
    const battery = initial.battery - (sensorTick % 40) * .0008;
    const gas = initial.gas + Math.round(Math.sin(sensorTick / 4) * 45);
    $("sensorTemp").textContent = temp.toFixed(1) + " °C";
    $("sensorHumidity").textContent = humidity.toFixed(1) + " %";
    $("sensorBattery").textContent = battery.toFixed(2) + " V";
    $("sensorGas").textContent = gas.toLocaleString("en-IN");
  }
  updateSensors();
  if (!reduceMotion) window.setInterval(updateSensors, 1800);
  $("sensorRefresh").addEventListener("click", () => { updateSensors(); addLog("SIM: sensor sample refreshed"); });
})();