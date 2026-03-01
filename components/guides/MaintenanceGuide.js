import Accordion from '../Accordion';

export default function MaintenanceGuide() {
  const maintenanceSteps = [
    {
      title: "Cleaning the Filters",
      content: (
        <>
          <p><strong>Why it matters:</strong> A clogged filter restricts water flow, which reduces suction power and puts strain on the motor. It's the #1 cause of poor performance.</p>
          <ul>
            <li><strong>Frequency:</strong> After <em>every</em> cleaning cycle. Do not let debris dry in the filters.</li>
            <li><strong>How to do it:</strong>
              <ol>
                <li>Remove the filter basket or cartridges from the robot.</li>
                <li>Open the bottom latch to dump large leaves and debris.</li>
                <li>Use a garden hose with a spray nozzle to rinse the mesh panels thoroughly.</li>
                <li><strong>Deep Clean:</strong> Once a month, if you notice a grey film, soak the panels in a dedicated filter cleaner solution or a mixture of water and dishwasher detergent to remove oils and sunscreen buildup.</li>
              </ol>
            </li>
          </ul>
        </>
      )
    },
    {
      title: "Checking the Brushes",
      content: (
        <>
          <p><strong>Why it matters:</strong> The brushes provide the traction needed to climb walls. As they wear down, the robot will start slipping and failing to reach the waterline.</p>
          <ul>
            <li><strong>Inspection:</strong> Check the rubber blades or foam rollers once a month.</li>
            <li><strong>Signs of Wear:</strong>
              <ul>
                <li><strong>Rubber Brushes:</strong> Look for missing blades or blades that are worn down to the wear indicator line.</li>
                <li><strong>Foam Brushes:</strong> Look for crumbling, tearing, or flattening.</li>
              </ul>
            </li>
            <li><strong>Replacement:</strong> Most brushes last 1-2 seasons depending on pool surface roughness. Replacing them is a cheap way to restore "like-new" climbing ability.</li>
          </ul>
        </>
      )
    },
    {
      title: "Cable Care & Anti-Tangling",
      content: (
        <>
          <p><strong>Why it matters:</strong> A twisted cable restricts the robot's movement, causing it to miss spots or get stuck. Severe tangling can damage the internal wires.</p>
          <ul>
            <li><strong>Prevention:</strong>
              <ul>
                <li><strong>Uncoil Fully:</strong> Before every use, walk the cable out along the pool deck to remove any kinks.</li>
                <li><strong>Don't Over-Tether:</strong> Only put enough cable in the pool to reach the furthest corner. Leave the excess on the deck.</li>
                <li><strong>Switch Directions:</strong> If your robot doesn't have a swivel, manually flip the handle to the opposite side after each use (if applicable) to counteract natural coiling.</li>
              </ul>
            </li>
            <li><strong>Storage:</strong> When coiling the cable for storage, use large, loose loops (over-under method). Never wrap it tightly around the power supply or your elbow.</li>
          </ul>
        </>
      )
    },
    {
      title: "Proper Storage",
      content: (
        <>
          <p><strong>Why it matters:</strong> UV rays and heat are the enemies of plastic and rubber. Leaving your robot in the sun will make the plastic brittle and the tracks gummy.</p>
          <ul>
            <li><strong>Daily Storage:</strong> Store the robot in a shaded area or under a cover. A caddy is highly recommended as it keeps the brushes off the ground (preventing flat spots) and organizes the cable.</li>
            <li><strong>Winter Storage:</strong>
              <ul>
                <li>Clean and dry the unit thoroughly.</li>
                <li>Store in a frost-free environment (garage or shed). Freezing temperatures can damage the motor seals and residual water can crack the plastic.</li>
                <li>Coil the cable neatly to prevent permanent kinks.</li>
              </ul>
            </li>
          </ul>
        </>
      )
    },
    {
      title: "Impeller & Track Check",
      content: (
        <>
          <p><strong>Why it matters:</strong> Debris wrapped around moving parts creates drag and can burn out drive motors.</p>
          <ul>
            <li><strong>Impeller:</strong> Look down into the top exhaust vent. Use a flashlight to check for hair, string, or twigs wrapped around the fan blade. Use long tweezers or needle-nose pliers to remove obstructions.</li>
            <li><strong>Tracks:</strong> Inspect the space between the tracks and the robot body. Small rocks or acorns can get wedged here, causing the robot to track in circles or stop moving entirely.</li>
          </ul>
        </>
      )
    }
  ];

  return <Accordion items={maintenanceSteps} />;
}