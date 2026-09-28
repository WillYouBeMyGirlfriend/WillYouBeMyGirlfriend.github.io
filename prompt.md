# Interactive Romantic Bouquet Proposal Website

Build a polished, production-quality single-page interactive website whose purpose is to present a romantic proposal:

> **Megan, I love you, will you be my girlfriend?**

The website should feel like a **romantic, dreamy, hand-crafted experience with a subtle Miffy-inspired aesthetic**, rather than a generic Valentine's Day webpage.

The most important technical feature is the **procedurally generated bouquet**. It should feel intelligently composed by a florist, not like randomly scattered flowers.

---

## 1. Overall aesthetic

Use a **Miffy-inspired but original visual style**.

Do NOT simply copy official Miffy artwork or use copyrighted Miffy assets. Instead, create an original, minimalist bunny character and visual language clearly inspired by the simple, charming aesthetic.

The overall visual direction should be:

* Romantic
* Dreamy
* Cute
* Minimalist
* Soft
* Elegant
* Slightly playful

### Color palette

Primarily use:

* Light pinks
* Cream
* Beige
* Soft whites
* Very subtle muted greens for foliage

Avoid:

* Extremely saturated colors
* Dark backgrounds during the normal state
* Excessive gradients
* Generic "Valentine's Day" aesthetics
* Neon colors

The page should feel sophisticated rather than childish.

---

# 2. Single-screen experience

The entire website must fit within **one viewport**.

There should be **no scrolling**.

Design responsively for:

* Desktop — primary target
* Laptop
* Tablet
* Mobile

The composition should dynamically scale while preserving the visual hierarchy.

The bouquet should remain the main visual focus.

---

# 3. Opening screen

When the website initially loads, do NOT immediately show the proposal.

Instead, show a minimal opening screen.

Include a single button:

**💌 Open**

The opening screen should have the same cream/pink aesthetic.

The button should be elegant and inviting.

When the user clicks **Open**, transition smoothly into the main experience.

Use a short, polished transition rather than instantly swapping the page.

---

# 4. Main proposal screen

The main screen should contain three primary elements:

1. A large procedurally generated bouquet
2. The proposal text
3. Yes / No buttons

The only text on the main page should be:

> Megan, I love you, will you be my girlfriend?

and the two buttons:

> Yes

> No

Do not add subtitles, descriptions, instructions, headers, footers, or additional romantic text.

The proposal should be visually prominent but not overpower the bouquet.

---

# 5. Procedural bouquet — MOST IMPORTANT FEATURE

This is the centerpiece of the entire project.

The bouquet must be **generated algorithmically every time the experience is opened**.

Every generation should produce a different bouquet.

However, this must NOT simply be:

```text
random flower position
random flower size
random flower rotation
```

The algorithm should behave more like an intelligent florist composing a bouquet.

## Required flower types

Every bouquet must contain:

* Tulips
* Peonies
* Lilies
* Foliage/greenery

All three flower types must always be present.

The exact:

* number
* density
* position
* orientation
* size
* grouping
* overlap
* visual prominence

should vary between generations.

---

# 6. Intelligent bouquet composition

Create a bouquet-generation system that understands the structure of a real bouquet.

The algorithm should create:

### A. Bouquet silhouette

First determine the overall silhouette of the bouquet.

The bouquet should generally have:

* A narrower bottom
* A wider middle/top
* A visually balanced outer shape
* A natural asymmetry

Avoid creating a perfect circle, rectangle, or symmetrical fan.

The silhouette should have subtle irregularities.

---

### B. Stems

Generate stems that converge toward the bottom of the bouquet.

Stems should:

* Have slightly different angles
* Curve naturally
* Overlap
* Converge toward the wrapping
* Avoid looking like straight lines radiating from one point

Flowers should be attached naturally to their stems.

---

### C. Flower grouping

The algorithm should understand that different flowers play different roles.

For example:

### Tulips

Use tulips as elegant vertical/medium-height accent flowers.

They can:

* Sit slightly above other flowers
* Lean left/right
* Appear in small clusters
* Create vertical rhythm

### Peonies

Use peonies as larger, fuller focal flowers.

They should:

* Be larger than most tulips
* Create visual weight
* Appear primarily around the central/middle areas
* Occasionally overlap slightly

### Lilies

Use lilies as larger accent flowers with distinctive shapes.

They should:

* Have more open petals
* Be positioned around the bouquet rather than all clustered together
* Sometimes extend slightly beyond the main silhouette
* Add visual contrast against the rounded peonies

### Foliage

Foliage should fill gaps and establish the bouquet silhouette.

It should:

* Appear behind flowers
* Occasionally peek between flowers
* Extend slightly beyond the edges
* Have varied leaf sizes and angles
* Help prevent empty-looking areas

---

# 7. Density and randomness

Each generation should vary significantly.

For example, one bouquet might have:

* 5 tulips
* 4 peonies
* 3 lilies
* Dense foliage

Another might have:

* 9 tulips
* 3 peonies
* 5 lilies
* Sparse foliage

But every generated bouquet must still look intentionally composed.

Do NOT allow randomness to create:

* Flowers floating independently
* Large empty holes
* Impossible overlaps
* Flowers outside the bouquet for no reason
* Stems passing through flower centers unnaturally
* Excessive symmetry
* Identical spacing
* Completely uniform flower sizes

Use constrained randomness.

---

# 8. Layering system

Use explicit depth layers.

Recommended structure:

```text
background
↓
rear foliage
↓
rear flowers
↓
middle foliage
↓
main flowers
↓
front flowers
↓
wrapping paper
↓
ribbon
```

Flowers should overlap naturally.

Some flowers should appear behind others.

Some should appear in front.

The result should have genuine visual depth despite being illustrated.

---

# 9. Flower illustrations

Create the flowers using SVG/CSS/vector graphics or another scalable procedural method.

Do not rely on fragile external image URLs.

The flowers should have a consistent illustrated style matching the rest of the website.

### Tulips

Create recognizable tulip silhouettes with:

* curved petals
* natural heads
* slender stems
* slight variations in orientation

### Peonies

Create fuller, layered flowers with multiple petal shapes.

They should feel noticeably more complex and dense than tulips.

### Lilies

Create recognizable lilies with:

* long petals
* open flower shape
* central details/stamens
* elegant silhouette

### Foliage

Create several variations of leaves/greenery rather than repeating one identical leaf.

---

# 10. Flower color

Flowers should retain their recognizable natural colors.

Do NOT randomly make every flower any arbitrary color.

Instead, use appropriate palettes.

For example:

Tulips:

* pink
* red/pink
* pale pink
* cream

Peonies:

* pale pink
* blush
* soft pink
* cream

Lilies:

* white
* cream
* pale pink

The exact colors and distribution can vary between generations.

The algorithm should also choose a **coherent palette per bouquet**, so the flowers look like they belong together.

---

# 11. Bouquet wrapping

The bouquet must have wrapping paper.

Use:

* Cream/beige/pale pink wrapping paper
* Subtle paper texture
* Natural folded-paper shape

The wrapping should not dominate the bouquet.

Add a ribbon around the bouquet.

The ribbon should have slight variation between generations in:

* knot position
* angle
* width
* subtle pink/cream shades

---

# 12. Bouquet entrance animation

When the main screen appears, the bouquet should **grow into existence**.

Do not simply fade in the finished bouquet.

Animate the composition approximately like this:

1. Wrapping appears
2. Stems begin growing upward
3. Foliage grows outward
4. Flowers appear progressively
5. Flowers gently bloom/scale into place
6. Final bouquet settles naturally

The animation should be elegant and fairly quick.

Approximately 1.5–3 seconds.

Avoid excessive bouncing.

---

# 13. Miffy-inspired bunny

Include an original minimalist bunny character inspired by the simplicity of Miffy.

Do not use official copyrighted Miffy artwork.

The bunny should be:

* Simple
* Minimal
* Cute
* Static
* Cream/white
* Small enough that it doesn't compete with the bouquet

The bunny should normally be positioned somewhere around the interface without obstructing the bouquet.

### Important interaction

The bunny should react when hovering over the buttons.

When hovering over **Yes**:

The bunny should **pop into view smiling**.

When hovering over **No**:

The bunny should **pop into view frowning/sad**.

The character should enter with a small playful animation such as:

* slight scale-up
* tiny bounce
* pop-in

Do not animate the bunny continuously.

---

# 14. Mouse/pointer effect

On desktop, create a subtle cursor effect.

As the mouse moves, tiny **pink flower petals** should gently follow the cursor.

Requirements:

* Very small
* Pink
* Subtle
* Limited particle count
* Soft fade-out
* Slightly randomized trajectory
* No performance-heavy particle system

Do not use large hearts or excessive sparkles.

The petals should feel elegant.

On mobile, disable this effect because there is no mouse cursor.

---

# 15. YES hover interaction

Hovering over **Yes** should gradually transform the environment.

Do NOT trigger the full effect immediately.

As the user continues hovering:

### Gradually:

* Small flowers begin appearing around the **edges of the viewport**
* Flowers accumulate progressively
* The environment becomes increasingly romantic
* The edges become more decorated

IMPORTANT:

The generated edge flowers should consist of **flowers only**.

Do NOT generate stems or foliage for these edge flowers.

They should look like individual decorative flowers growing around the borders.

Use the same visual language as the bouquet.

Do not obscure the proposal text.

The effect should remain elegant rather than becoming chaotic.

When the cursor leaves the Yes button, the effect should gradually fade back out.

---

# 16. NO hover interaction

Hovering over **No** should produce the opposite emotional effect.

Gradually:

* The overall page becomes slightly darker
* The colors become more muted
* Soft clouds appear above/around the No button
* The clouds begin raining
* The atmosphere becomes melancholic
* Flowers in the bouquet begin subtly wilting

The rain should be gentle rather than dramatic.

Think:

**cute sad cartoon**, not horror.

The bouquet should visibly react, but don't destroy it.

When the cursor leaves No, the effect should gradually return to normal.

---

# 17. Yes / No transition behavior

Both buttons should use **progressive fade-in/fade-out transitions** for their environmental effects.

Do not instantly switch between:

Normal → Happy

or:

Normal → Sad

Instead use smooth transitions.

If the user moves:

Yes → No

the romantic effects should smoothly disappear while the sad effects appear.

Likewise:

No → Yes

should smoothly transition in the opposite direction.

The buttons themselves should remain stationary.

Do NOT make the No button run away from the cursor.

---

# 18. Clicking YES

When the user clicks **Yes**, trigger the final proposal success state.

The screen should become much more celebratory.

Generate flowers around the **edges of the entire screen**.

These should again be flowers only:

* No stems
* No foliage

They can vary in:

* size
* rotation
* position
* flower type
* density

The effect should frame the screen without covering the central content.

Then display a beautiful **pink box** in the center containing:

> **I LOVE YOU TOO**

The message should be the main focus of the success state.

Use an elegant pink rounded box with subtle depth/shadow.

The transition should feel rewarding and polished.

Do not play music.

Do not add another message underneath.

---

# 19. Clicking NO

The No button should remain clickable.

Do not move it away.

Do not disable it.

Do not make it impossible to click.

The interaction should primarily be the humorous dark/cloud/rain/wilting effect described above.

---

# 20. Technical architecture

You may use any modern frontend technology.

Preferred:

* React
* TypeScript
* Vite
* SVG
* CSS animations
* Framer Motion or another animation library if genuinely useful

However, avoid adding dependencies unnecessarily.

The website should be lightweight.

---

# 21. Asset requirements

Do NOT depend on random third-party image-hosting URLs.

All critical visual assets should either be:

* Generated as SVG/CSS
* Stored locally in the project
* Loaded from extremely stable services such as Google Fonts where appropriate

The website must continue working if an arbitrary external image host disappears.

Ideally, the entire visual experience should function without any external image assets at all.

---

# 22. Responsive behavior

Desktop is the primary target, but mobile must work properly.

On desktop:

* Large bouquet
* Proposal centered beneath it
* Buttons underneath
* Bunny positioned around the composition

On mobile:

* Bouquet scales down
* Text remains readable
* Buttons remain easy to tap
* Bunny moves to a non-obstructive position
* No mouse-petal effect
* Edge flowers must not cover important UI

Maintain the single-screen requirement as much as practical.

---

# 23. Visual quality requirements

This should look like a **real polished romantic interactive website**, not a coding demo.

Pay particular attention to:

* Spacing
* Typography
* Animation timing
* Layering
* Composition
* Bouquet silhouette
* Natural flower placement
* Shadows
* Subtle textures
* Responsive sizing
* Performance

Avoid:

* Generic gradients
* Emoji as the primary graphics
* Randomly positioned SVGs
* Excessive animations
* Excessive hearts
* Excessive sparkles
* Cheap-looking clipart
* Clashing colors
* Overly childish UI

---

# 24. Most important requirement: believable procedural generation

The bouquet generator is the core feature.

Treat it as a **composition algorithm**, not a randomizer.

A useful conceptual pipeline is:

```text
Generate palette
        ↓
Generate bouquet silhouette
        ↓
Determine flower density
        ↓
Place structural foliage
        ↓
Place major peonies
        ↓
Place lilies
        ↓
Place tulip clusters
        ↓
Fill visual gaps
        ↓
Apply depth/layering
        ↓
Generate stems
        ↓
Generate wrapping
        ↓
Generate ribbon
        ↓
Validate composition
        ↓
Render
```

The algorithm should have constraints that reject poor compositions and regenerate problematic areas.

Consider using concepts such as:

* weighted random placement
* attraction/repulsion between flowers
* focal-point positioning
* bounding regions
* collision detection
* depth layers
* density maps
* silhouette constraints
* controlled asymmetry
* cluster generation
* negative-space detection

The final bouquet should look intentionally arranged.

If two bouquets are generated consecutively, they should visibly differ while both remaining aesthetically pleasing.

---

# 25. Code quality

Structure the project cleanly.

Separate:

* Bouquet generation
* Flower components
* Foliage
* Wrapping/ribbon
* Bunny
* Particle effects
* Hover state
* Success state
* UI
* Animation logic

Create reusable components.

Use TypeScript types/interfaces for the procedural flower data.

Avoid putting the entire website in one enormous component.

Document the bouquet-generation algorithm clearly so it can be modified later.

---

# 26. Final user experience

The intended experience is:

```text
                  💌
                Open
                  ↓
            Smooth transition
                  ↓
        🌷 Procedural bouquet 🌷
                  ↓
   "Megan, I love you, will you be my girlfriend?"
                  ↓
              Yes   No
              ↓      ↓
           🌸🌸    ☁️🌧️
          happy     sad
              ↓
          Click Yes
              ↓
       🌸🌸🌸🌸🌸🌸🌸
          ┌───────────┐
          │ I LOVE    │
          │ YOU TOO   │
          └───────────┘
       🌸🌸🌸🌸🌸🌸🌸
```

The entire website should feel like a **small interactive romantic gift**, with the procedural bouquet being the centerpiece and the Miffy-inspired bunny acting as a charming secondary character.

The experience should be memorable because the bouquet is genuinely different every time while still looking deliberately designed.

