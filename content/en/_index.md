---
# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

design:
  # Default section spacing
  spacing: "6rem"

sections:
  - block: resume-biography-3
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
      text: ""
      # Show a call-to-action button under your biography? (optional)
      # button:
      #   text: Download CV
      #   url: uploads/resume.pdf
    design:
      css_class: dark
      background:
        color: black
        image:
          # Add your image background to `assets/media/`.
          filename: stacked-peaks.svg
          filters:
            brightness: 1.0
          size: cover
          position: center
          parallax: false

  - block: markdown
    content:
      title: '❐ Research Highlights ❐'
      subtitle: ''
      text: |-
        ### <center>Walking Tourism Ecosystem Driven by Mobile Applications</center>

        <p style="font-size:90%; text-align:justify">My research aims to enhance the ecosystem of destination tourism, contributing to the sustainability of both individuals and local communities.</p>

        <p style="font-size:90%; text-align:justify"><span style="font-weight: bold;">From the Destination Manager's Perspective:</span> Walking tourism has become an attractive option for local businesses. This style of tourism adds value by combining multiple existing regional resources and stories, making it accessible to all regions. Digitalizing walking tourism can accelerate community-led initiatives and provide valuable urban-scale analytics.</p>

        <p style="font-size:90%; text-align:justify"><span style="font-weight: bold;">From the Tourist's Perspective:</span> Walking tourism greatly enhances both personal health and cultural exploration. It is a low-impact exercise that improves cardiovascular health, strengthens muscles, and reduces stress and anxiety. Furthermore, walking allows tourists to deeply engage with their surroundings, fostering genuine interactions with locals and uncovering hidden cultural gems.</p>

        <p style="font-size:90%; text-align:justify; color:gray;">"There is nothing special to visit in my hometown..."</p>
        
        <p style="font-size:90%; text-align:justify; color:gray;">"Actually, the real voyage of discovery consists not in seeking new landscapes, but in having new 'digital' eyes."</p>

        ---

        #### ◉ Thematic Heatmapping and Scoring Methods for Developments of Walking Routes (2021–)

        <img width="100%" src="home/graphical-abstract-topic1.png">

        <p style="font-size:90%; text-align:justify">Establishing a cost-effective digital feedback system that contributes to the development of walking model routes, considering both spots and walking paths, is a challenge in fostering sustainable regional tourism. This study discusses a feedback system that contributes to the evaluation and improvement of existing model routes by mapping tourists’ access (attention) to tourist resources based on the automatic collection and analysis of mobile sensor data, which is standardly equipped on smartphones and other devices.</p>

        <p style="font-size:70%; text-align:left; font-weight: bold;">references:</p>
        <p style="font-size:70%; text-align:left;">[1] Sasaki et al. (2020). Articulated Trajectory Mapping for Reviewing Walking Tours. ISPRS Int. J. Geo-Inf. 9(10):610. <a href="https://doi.org/10.3390/ijgi9100610">https://doi.org/10.3390/ijgi9100610</a></p>
        <p style="font-size:70%; text-align:left;">[2] Sasaki et al. (2023). Mobile Collaborative Heatmapping to Infer Self-Guided Walking Tourists’ Preferences for Geomedia.. ISPRS Int. J. Geo-Inf. 12(7):283. <a href="https://doi.org/10.3390/ijgi12070283">https://doi.org/10.3390/ijgi12070283</a></p>

        ---

        #### ◉ Automatic Geofencing Design for Scalable Location-Based Services (2023–)

        <img width="100%" src="home/graphical-abstract-topic2.png">

        <p style="font-size:90%; text-align:justify">The core technology of proactive location-based services is known as geofencing. Geofencing utilizes virtual boundaries, i.e., geofences, to monitor user’s entry and exit, and then triggers place-related services such as sending coupons and playing audio guides automatically. The purpose of this research is to formulate geofence design problems for tourists' mobility and to develop data-driven computational solutions. These solutions leverage mobile sensor data to comprehend dynamic and complex human mobility patterns.</p>

        <p style="font-size:70%; text-align:left; font-weight: bold;">references:</p>
        <p style="font-size:70%; text-align:left;">[1] Sasaki et al. (2020). Data-Driven Geofencing Design for POI Notifiers Utilizing Genetic Algorithm. ISPRS Int. J. Geo-Inf. 13(6):174. <a href="https://doi.org/10.3390/ijgi13060174">https://doi.org/10.3390/ijgi13060174</a></p>

        ---

        #### ◉ Onsite Radio App — Generative Audio Guide Driven by Hierarchical Geofencing and Large Language Models (2024–)

        <img width="100%" src="home/graphical-abstract-topic3.png">

        <p style="font-size:90%; text-align:justify">POI-based guide applications face challenges in local cities. When walking in areas with fewer notable spots, the opportunities for user interaction decrease, often resulting in silence due to a lack of content. Additionally, some tourists may deviate from the intended routes, disrupting the optimal flow designed to enhance regional experiences. Our proposal, incorporating hierarchical geofencing and conversation generation techniques, provides more flexible and continuous guide interactions through the Onsite Radio App. Simply press the play button, slip your smartphone into your pocket, and start walking. Every step you take will be transformed into captivating storytelling delivered by virtual characters.</p>

        <p style="font-size:70%; text-align:left; font-weight: bold;">references:</p>
        <p style="font-size:70%; text-align:left;">[1] Sasaki et al.(2024). Hierarchical Geofencing for Location-Aware Generative Audio Tours. Urban Info</p>

    design:
      columns: '1'
  # - block: collection
  #   id: papers
  #   content:
  #     title: Featured Publications
  #     filters:
  #       folders:
  #         - publication
  #       featured_only: true
  #   design:
  #     view: article-grid
  #     columns: 2
  
  # - block: collection
  #   id: talks
  #   content:
  #     title: Recent & Upcoming Talks
  #     filters:
  #       folders:
  #         - event
  #   design:
  #     view: article-grid
  #     columns: 1
  # - block: collection
  #   id: news
  #   content:
  #     title: Recent News
  #     subtitle: ''
  #     text: ''
  #     # Page type to display. E.g. post, talk, publication...
  #     page_type: post
  #     # Choose how many pages you would like to display (0 = all pages)
  #     count: 5
  #     # Filter on criteria
  #     filters:
  #       author: ""
  #       category: ""
  #       tag: ""
  #       exclude_featured: false
  #       exclude_future: false
  #       exclude_past: false
  #       publication_type: ""
  #     # Choose how many pages you would like to offset by
  #     offset: 0
  #     # Page order: descending (desc) or ascending (asc) date.
  #     order: desc
  #   design:
  #     # Choose a layout view
  #     view: date-title-summary
  #     # Reduce spacing
  #     spacing:
  #       padding: [0, 0, 0, 0]
  - block: cta-card
    demo: true # Only display this section in the Hugo Blox Builder demo site
    content:
      title: 👉 Build your own academic website like this
      text: |-
        This site is generated by Hugo Blox Builder - the FREE, Hugo-based open source website builder trusted by 250,000+ academics like you.

        <a class="github-button" href="https://github.com/HugoBlox/hugo-blox-builder" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star HugoBlox/hugo-blox-builder on GitHub">Star</a>

        Easily build anything with blocks - no-code required!
        
        From landing pages, second brains, and courses to academic resumés, conferences, and tech blogs.
      button:
        text: Get Started
        url: https://hugoblox.com/templates/
    design:
      card:
        # Card background color (CSS class)
        css_class: "bg-primary-700"
        css_style: ""
---
