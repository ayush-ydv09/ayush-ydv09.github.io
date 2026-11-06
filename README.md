# Ayush Yadav — Electronics Lab Portfolio

Personal engineering portfolio focused on **Embedded Systems, Firmware Development, and Electronics**.

The site is built as a lightweight static website using HTML, CSS, vanilla JavaScript, and inline SVG. It is designed for GitHub Pages and does not require a build step or external JavaScript dependencies.

## Run locally

1. Clone the repository:
   ```bash
   git clone https://github.com/ayush-ydv09/ayush-ydv09.github.io.git
   ```
2. Check out the redesign branch:
   ```bash
   cd ayush-ydv09.github.io
   git checkout electronics-lab-redesign
   ```
3. Open `index.html` in a browser, or use the VS Code Live Server extension.

## Portfolio features

- Interactive browser-based workbench with simulated 12-bit ADC conversion.
- Oscilloscope-style sine, square, and PWM waveform display.
- Virtual GPIO output toggles and UART serial terminal.
- Clearly labelled simulated sensor telemetry.
- ESP32-style conceptual board illustration and sensor-system schematic.
- Project summaries and an engineering notebook covering embedded fundamentals.
- Responsive layout, theme toggle, keyboard focus styles, and reduced-motion support.

## Important simulation and hardware notes

The workbench runs entirely in the browser. It does **not** connect to a physical ESP32 or display live sensor telemetry.

The board drawing and system schematic are illustrative, not production wiring instructions. Verify the exact development-board pinout and module requirements before wiring. ESP32 GPIO is not 5 V tolerant; analogue sensor outputs must be conditioned to remain within the board's ADC input limits.

## Deploy with GitHub Pages

The live site is configured separately from this redesign branch. Review the redesign first, then merge it into `main` when ready. In **Settings → Pages**, use **Deploy from a branch**, select `main`, and choose the `/ (root)` folder if Pages is not already configured.

## Project links

- [Food Spoilage Monitoring System](https://github.com/ayush-ydv09/food-spoilage-monitoring-system)
- [Robotic Arm](https://github.com/ayush-ydv09/ROBOTIC_ARM)

## Contact

- [GitHub](https://github.com/ayush-ydv09)
- [LinkedIn](https://www.linkedin.com/in/ayush80/)
- [Portfolio Website](https://ayush-ydv09githubio.vercel.app/)
