export type ResearchTheme = {
  title: string;
  tags: string;
  body: string;
};

export type ResearchThemesDoc = {
  title: string;
  overview: string;
  themes: ResearchTheme[];
  sentimentTags: {
    tags: string;
    body: string;
  };
  source: string;
};

export const adaptUsabilityResearchThemes: ResearchThemesDoc = {
  title: "Research Themes – Adapt Theming Global Padding Settings",
  overview:
    "The following research themes were synthesized from 66 tags across 10 usability testing sessions on the Adapt Theming Global Padding Settings feature. These themes represent the core patterns and user sentiments that emerged from the research.",
  themes: [
    {
      title: "Theme 1: Approach B Is the Clear Winner",
      tags: "Approach B preferred – less manual work · Approach B more logical · Liked approach B",
      body: "Participants consistently favored Approach B over alternatives. It was perceived as more logical, requiring less manual work, and aligning better with users' mental models for configuring padding."
    },
    {
      title: "Theme 2: Visual UI Preferred Over CSS Coding",
      tags: "Visual UI preferred over CSS · Help non-coders with UI options · Frontend-Based Editing · Avoids Direct CSS Code · Preset values easier than coding · Custom CSS for page · Cheat Codes for custom CSS · Conditional CSS Override",
      body: "Users strongly prefer visual, UI-driven controls over writing CSS. Non-technical users especially need UI-based options to manage padding. While some power users rely on custom CSS workarounds and conditional overrides, the majority want to avoid direct code editing."
    },
    {
      title: "Theme 3: Padding Controls & Hierarchical Structure",
      tags: "Block padding most commonly adjusted · Hierarchical padding sizing is logical · Component-level adds clarity · Element-level control appreciated · Global control over page-level · Global settings save time · Block double padding · Padding Consistency Across Components · Padding Irregularity Frustration · Redundant Padding · Limited Padding Ratio Control · Custom padding · Custome margins · Custome option for padding · Padding Control on preview · Identifies Applied Padding",
      body: "Block-level padding is the most frequently adjusted setting. Users find the hierarchical padding sizing (global → component → element) logical and appreciate having control at each level. However, issues like double padding, redundant padding, and inconsistency across components cause frustration. Users want both global efficiency and granular element-level control."
    },
    {
      title: "Theme 4: Numeric Values & Preset Clarity",
      tags: "Show numeric pixel values · Preset values lack clarity · Numeric Clarity · Perceives Configuration Settings unclear",
      body: "Users want to see actual numeric pixel values rather than abstract preset labels. The current preset values (e.g., small/medium/large) lack clarity, and users find configuration settings unclear without visible numeric feedback."
    },
    {
      title: "Theme 5: Navigation & Terminology Confusion",
      tags: "Terminology confusing · Settings location not intuitive · Navigation Confusion · Unclear Page Hierarchy · Unclear Structural Hierarchy in Preview · Improve Navigation Cues",
      body: "Participants struggled with confusing terminology and non-intuitive settings locations. The page hierarchy and structural relationships were unclear in the preview, making it hard for users to find and understand where padding controls live."
    },
    {
      title: "Theme 6: Workflow Efficiency & Time Savings",
      tags: "Efficient and fast workflow · Time-Saving Feature · Improved Workflow · Default-First Workflow · Improved Experience · Appreciates Reduced Complexity",
      body: "Users value efficiency above all. The global padding feature is seen as a significant time-saver, and the default-first workflow (start from defaults, adjust as needed) aligns well with how users work. Reduced complexity is appreciated."
    },
    {
      title: "Theme 7: User Confidence & Task Completion",
      tags: "Successful Task Completion · Confident Interaction · Feature Understanding · Delayed Task Completion · Visual Feedback Recognition · Frustration Signals · Trial-and-Error Approach",
      body: "Most participants completed tasks successfully and felt confident using the feature. However, some experienced delayed task completion, resorted to trial-and-error approaches, and showed frustration signals — indicating areas where the interface could better guide users."
    },
    {
      title: "Theme 8: Automation & Smart Behavior",
      tags: "Auto-remove padding when content removed · Rule-Based Automatic Padding Logic",
      body: "Users expect intelligent behavior from the system — such as automatically removing padding when content is deleted and applying rule-based logic to padding calculations. This reduces manual overhead and errors."
    },
    {
      title: "Theme 9: Customization Needs & Pain Points",
      tags: "Hybrid Control (Predefined + Custom) · Frequent Customization Across Projects · Stakeholder-Driven Design Variability · Customization is pain · Manual Page-Level Configuration · Preview-Driven Adjustment",
      body: "Users need hybrid controls that combine predefined presets with custom overrides. Frequent customization across projects and stakeholder-driven variability make flexible padding essential. However, the current customization process is painful and overly manual, especially at the page level."
    },
    {
      title: "Theme 10: Legacy & Compatibility Concerns",
      tags: "Concern About Legacy Compatibility",
      body: "Some participants raised concerns about how new global padding settings would interact with existing legacy projects and content. Backward compatibility is important for adoption."
    }
  ],
  sentimentTags: {
    tags: "Positive · Negative · Important Findings · Opportunities · Expectations",
    body: "These cross-cutting sentiment tags were applied across sessions to categorize highlights by valence and significance, enabling quick filtering of positive feedback, pain points, key opportunities, and user expectations."
  },
  source: "https://laerdal.dovetail.com/docs/3Ugkq5KauIc6YsSHcidZHP"
};
