export type ResearchSection = {
  number: string;
  title: string;
  confidence: "Strong" | "Moderate";
  intro: string;
  quotes: string[];
  relatedTags?: string[];
  counterEvidence?: string;
};

export type Recommendation = {
  lead: string;
  body: string;
};

export type Participant = {
  name: string;
  role: string;
};

export type DiscoveryResearchReportDoc = {
  title: string;
  meta: {
    project: string;
    participants: string;
    roles: string;
    objective: string;
  };
  consentNote?: string;
  sections: ResearchSection[];
  recommendations: Recommendation[];
  participants: Participant[];
  source: string;
};

export const adaptDiscoveryResearchReport: DiscoveryResearchReportDoc = {
  title: "Adapt Authoring Tool — User Research Report",
  meta: {
    project: "Adapt Authoring Tool User Research",
    participants:
      "9 interviews — participants P1 to P9. Participants gave consent for internal research use; names and identifying detail removed for publication.",
    roles:
      "Director Impact & Healthcare Simulation, Implementation Manager, Graphic Manager, Senior EdTech Specialist, Senior Educational Illustrator, Senior Project Manager, Educational Designer/Illustrator",
    objective:
      "Understand course creators' needs, challenges, and workflows to identify opportunities for improving the Adapt Authoring Tool."
  },
  consentNote:
    "Participants gave consent for internal research use; names and identifying detail removed for publication.",
  sections: [
    {
      number: "1",
      title: "Platform Usability & Intuitiveness",
      confidence: "Strong",
      intro:
        "The most consistent finding across nearly all participants is that Adapt lacks intuitiveness, especially for new or infrequent users.",
      quotes: [
        "P1 described the platform as \"not a very intuitive kind of a platform… only if you know it well, you'll be able to do it.\"",
        "P8 compared Adapt unfavourably to Articulate Rise: \"That's much more intuitive and very simple and you always know where you are and how it will look like before you actually drag the blocks in.\" They noted that in Adapt, \"you have to go in there and in there… a lot of clicks before you actually know.\"",
        "P3 reported that new users \"don't understand anything… it's so hard to figure out how to do stuff in adapt. It's not intuitive kind of, enough.\"",
        "P2 flagged navigation confusion: \"while navigating, sometimes I do get lost on a page as well. Moving the components up and down becomes a bit difficult for me.\"",
        "P5 acknowledged the interface \"hasn't changed very much in the back end\" and noted working in it \"is very slow, very, very, very slow\" when courses are heavy."
      ],
      relatedTags: [
        "No undo redo functionality",
        "Platform Challenges (Search course)",
        "Platform Expertise Limitations",
        "Time consuming in Adapt",
        "Time Constraints to learn and try",
        "Intuitive Platforms",
        "Easy navigation in course"
      ],
      counterEvidence:
        "P7 observed that while the beginning is challenging, \"when you get the hang of it, it seems very intuitive.\" A long-standing user (P3) said \"for me it's more like, I know it inside out.\" This suggests a steep learning curve rather than a permanently poor experience."
    },
    {
      number: "2",
      title: "Preview & Editing Workflow",
      confidence: "Strong",
      intro:
        "Multiple participants highlighted the disconnect between editing and previewing as a major time sink. No counter-evidence emerged.",
      quotes: [
        "P3 described it as \"time consuming to go back and to say preview… in articulate, for example, you create and see what you have created right away.\" They added: \"if it was possible to kind of be in the preview mode and then just write… that would be like amazing.\"",
        "P8 said they have \"no idea how it will look like before I have filled in everything and then say preview course,\" and must fill placeholder text first or get errors.",
        "P9 described image testing as \"a little bit annoying… you need to upload, then you need to check it through the browser, how it works and then change it 50 times.\""
      ]
    },
    {
      number: "3",
      title: "Framework Updates & Coding Disruptions",
      confidence: "Strong",
      intro:
        "Framework updates repeatedly broke existing courses, causing significant stress and delivery delays.",
      quotes: [
        "P5 described that \"the framework updates were causing too much of an issue. Things were being broken and changed which extended maybe delivery times. The course designers got very stressed about it.\" Their team had to separate the WHO Academy instance from these updates.",
        "P3 explained: \"when I want to change things, I need to code it. And if… adapt upgrades, then the coding gets interrupted and it doesn't look like it did.\" With 30 courses, they have to \"go through all the 30 courses to see that they are OK.\"",
        "P8 shared a concrete incident where \"some of the headlines that I had suddenly was bold instead of light. That doesn't make sense.\""
      ],
      relatedTags: ["Coding Challenges", "New updates coz coding Interruptions", "Jira Ticket"]
    },
    {
      number: "4",
      title: "Templates, Design & Interactivity",
      confidence: "Strong",
      intro:
        "Course creators desire more pre-built templates and interactive components to speed up production and improve visual quality.",
      quotes: [
        "P3 wished for \"more templates… when they are premade a little bit, so you don't have to start on the A when it's already done ABC DE for you.\" They also wanted Adapt to be \"more playful… more interactivity that we can play around with.\"",
        "P5 confirmed that a template system at \"article page block and component levels even to go as far as having even the whole course as a template… that's gonna be definitely used by our team.\"",
        "P9 noted that Adapt is \"missing this style and interactivity and just to be in time… to make it look like for today, not for past.\""
      ],
      relatedTags: [
        "Gamification",
        "making course Interactive",
        "Media playlist improvement",
        "Menu component improvement",
        "Course designed in figma",
        "users likes Videos and narratives"
      ]
    },
    {
      number: "5",
      title: "Collaboration, Review & Feedback",
      confidence: "Strong",
      intro:
        "The review and feedback loop is largely manual and fragmented, lacking native commenting or annotation tools.",
      quotes: [
        "P3 highlighted that \"in rice you can do… the partners can do comments within rice, in adapt we don't have that solution.\"",
        "P5 described how the storyboard export \"stopped working at one point… it wasn't good to work with the output\" and their team adopted a third-party tool (Zipboard) as a workaround.",
        "P2 said: \"the preview link doesn't work for us every time… I have never sent it out externally for getting the feedback from anyone.\"",
        "P3 observed teams work in silos: \"we are working more or less in silos… I'm working with my products and in Denmark, they are working with theirs, but we don't share it.\""
      ],
      relatedTags: [
        "Comment functionality",
        "No tag comments functionality",
        "Course review challenges",
        "Create course with team collaboration",
        "End user feedback",
        "Course feedback by internal teams",
        "Client Expectations"
      ]
    },
    {
      number: "6",
      title: "Training, Onboarding & Support",
      confidence: "Strong",
      intro:
        "Training is almost entirely peer-to-peer and on-the-job, with limited self-service resources.",
      quotes: [
        "P4 received \"around 1.5 months, six weeks of training\" as on-the-job hands-on.",
        "P2 wanted \"each time I cannot be dependent on anyone to come back and train me… any resource where it helps me to search for my queries… like the smaller videos.\"",
        "P7 confirmed onboarding is \"pretty much on the job training and trained a trainer… the more experienced people are kind of coaching the new newcomers.\"",
        "P9's onboarding was \"very fast… it was not some guidance that I can use and go through and see how it works. It was more like manually to explore.\""
      ],
      relatedTags: [
        "Adapt Training duration",
        "Self-Paced Learning",
        "Searchable Tutorials",
        "AI integration for help",
        "help & how to be inspirational"
      ]
    },
    {
      number: "7",
      title: "Error Handling & Technical Support",
      confidence: "Moderate",
      intro: "Errors in Adapt are described as vague and unhelpful.",
      quotes: [
        "P2 said: \"it gives you an error if there is something wrong, but it does not specify a good error… most of the times I have to figure it out myself or reach out to a colleague.\"",
        "P8 relied on a colleague for error resolution: \"he just helped me… a lot of things he managed to do himself and I, I don't fix them.\""
      ],
      relatedTags: [
        "Errors are not very explicit",
        "Service request for technical support",
        "Service request through separate link",
        "Support Request ticket system",
        "Feasibility check with Dev team"
      ]
    },
    {
      number: "8",
      title: "Asset Management & Media",
      confidence: "Moderate",
      intro:
        "Managing images, videos, and illustrations is a pain point, especially around resolution, tagging, and retrieval.",
      quotes: [
        "P5 described the asset manager as overwhelming: \"you have thousands of graphics, images, videos that just clog the asset manager… unless there's a tagging system that they know how to find it, they probably reupload the same graphic.\"",
        "P2 noted challenges with \"low resolution pictures\" and difficulty getting high-resolution illustrations from internal teams.",
        "P3 warned that interactivity and H5P can make courses heavy: \"if you use an H five P with a lot of interactivity within the video, it gets too heavy.\""
      ],
      relatedTags: [
        "Difficult to get illustration and images",
        "Getting high resolution images",
        "H5P makes video heavy",
        "Interactive video integration process",
        "Bookmark video"
      ]
    },
    {
      number: "9",
      title: "Analytics & Assessment",
      confidence: "Moderate",
      intro: "Participants value analytics but see gaps in competency tracking and granular scoring.",
      quotes: [
        "P5 explained that \"up until now, we have not had the CMI-5… these are very new to adapt\" and that without proper analytics \"we cannot right now say what needs changing.\"",
        "P2 described finding Google Analytics useful for heat maps and user counts.",
        "P4's team wants confidence-based assessment with analytics that show learner progress before and after modules."
      ],
      relatedTags: [
        "Assessment improvement",
        "Model question Confidence Assessment",
        "Adaptive learning feature",
        "No Competency Tracking feature",
        "Detailed score",
        "Analytics report is useful"
      ]
    },
    {
      number: "10",
      title: "Course Organization & Management",
      confidence: "Moderate",
      intro: "With growing numbers of courses and multiple instances, organization becomes difficult.",
      quotes: [
        "P1 recalled confusion when \"there was some three circle of learning courses… every time I would pull out something, I'd be like, OK, I didn't do this\" because courses had similar names.",
        "P2 said: \"when there are a large number of shared courses, it gets a bit difficult for me to look at. And then I would also sometimes don't know who has created this course.\"",
        "P3 and others use naming conventions to organize courses, but there is no standardized system across teams."
      ],
      relatedTags: [
        "Manage courses in different Instance",
        "Role-Based Access",
        "Different links for different roles",
        "Course structure",
        "Offline Learning"
      ]
    }
  ],
  recommendations: [
    {
      lead: "Improve live preview / WYSIWYG editing",
      body: "The single most impactful usability improvement, cited by P3, P8, P9, and P2."
    },
    {
      lead: "Expand template library",
      body: "Pre-designed templates at article, page, and course levels to accelerate production and reduce coding reliance."
    },
    {
      lead: "Add native commenting/review tools",
      body: "Reduce dependence on email and third-party tools for partner feedback loops."
    },
    {
      lead: "Strengthen error messaging",
      body: "Make errors actionable with specific guidance on what to fix and where."
    },
    {
      lead: "Stabilize framework updates",
      body: "Ensure backward compatibility or provide clear impact assessments before updates roll out."
    },
    {
      lead: "Build self-service learning resources",
      body: "Searchable, short-form video tutorials for on-demand learning."
    },
    {
      lead: "Improve asset manager",
      body: "Better tagging, search, and duplicate detection for media assets."
    },
    {
      lead: "Enhance assessment and analytics",
      body: "Competency tracking, detailed per-skill scoring, and adaptive learning paths."
    }
  ],
  participants: [
    { name: "P1", role: "Director Impact & Healthcare Simulation" },
    { name: "P2", role: "Implementation Manager" },
    { name: "P3", role: "Graphic Manager" },
    { name: "P4", role: "Senior EdTech Specialist (course creator)" },
    { name: "P5", role: "Senior EdTech Specialist" },
    { name: "P6", role: "Senior Educational Illustrator" },
    { name: "P7", role: "Senior Project Manager" },
    { name: "P8", role: "Educational Designer / Graphic Designer" },
    { name: "P9", role: "Graphic Designer / Illustrator" }
  ],
  source: ""
};
