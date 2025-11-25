---
source: deepdives/research projects/ta_analysis/ta_analysis.html
title: Statistical Analysis of TA Hiring – Research Project
type: page
---

deepdives/research projects/ta_analysis/ta_analysis.html

# Statistical Analysis of TA Hiring – Research Project
Statistical Analysis of TA Hiring – Research Project
← Back to Projects
Research Projects

# Statistical Analysis of TA Hiring Bias in Computing Programs
Statistical Analysis of TA Hiring Bias in Computing Programs
Data-driven intersectional study that analyzed more than 15,000
teaching assistant applications across computing courses to uncover
gender and demographic disparities in TA hiring and to inform equity
focused policy changes.

### Note
Note:
WNB refers to
Women and Non Binary
applicants grouped together for
statistical privacy and stability in the study results.

### Publication
Publication:
SIGCSE 2025 - Understanding Demographic Bias in Teaching Assistant
Hiring

### Role
Role:
Research Assistant and Analyst

### Timeline
Timeline:
Jan 2024 - May 2024

### Tech Stack
Tech Stack:
Python, Pandas, NumPy, SciPy, statsmodels, Matplotlib, Plotly
Relative percentage of all applications by course, split by WNB and
Men. Many foundational courses show similar or even higher WNB
application rates, which means downstream hiring differences cannot
be explained purely by lack of interest or pipeline.

## Quick insights
Quick insights

### Goal
Goal:
Quantify whether teaching assistant hiring decisions in a large
computing program differ by gender, race, and student status, and
provide data backed recommendations that departments can turn into
policy.
Why this matters?
Very few peer reviewed papers study TA hiring patterns, even though
TAs are central to grading, mentoring, and classroom culture. This
work adds a crucial but rarely measured dimension to equity work in
computing education research.

### Headline result
Headline result:
For entry level MS courses we observed that
Women and Non Binary (WNB) applicants were hired at markedly
lower rates than Men
, despite comparable application patterns. For one cluster of entry
level MS courses the effect corresponded to roughly a
42.5% shortfall
in WNB hires relative to their share of the
qualified applicant pool.
What WNB means?
WNB refers to
Women and Non Binary applicants grouped together
. The number
of non binary applicants was extremely small, which made separate
statistical analysis unreliable and at risk of exposing individuals.
Following common practice, we merged women and non binary applicants
into a single category for robust and privacy preserving analysis.

## Preliminary Analysis
Preliminary Analysis
The dataset spanned multiple years of TA applications for both
undergraduate and graduate computing courses. Each record included
applicant demographics, course applied for, instructor, and hiring
outcome. My contribution focused on cleaning the data, building
reproducible analysis notebooks, and constructing interactive
visualizations that faculty could explore.

### Data preparation
Data preparation:
Normalized course names, merged multiple application systems, and
filtered to applicants who met minimum eligibility criteria so that
we compared candidates who were realistically hireable.

### Statistical tests
Statistical tests:
Used
Jensen Shannon Distance (JSD)
, two sample t-tests, and
one way ANOVA to compare hiring outcomes across demographic groups
and instructors.

### Additional demographic analysis
Additional demographic analysis:
Beyond gender, we examined patterns by race, by international versus
domestic status, and prior teaching experience. We also ran
intersectional analyses
for race × gender and race ×
international status to test whether disparities compound for
specific groups.

## Course level application patterns
Course level application patterns
The
Relative Percentage of All Applications by Course
(chart at
the top) compares how often WNB and Men apply to each course. It helps

### answer two key questions
answer two key questions:
Do WNB candidates apply to the same types of courses as Men?
Do hiring outcomes reflect these application patterns?
Several MS level gateway courses have
substantial WNB application shares
that are similar to or
higher than Men. This was important because it ruled out a simple
explanation that WNB candidates were not applying to the courses where
hiring imbalances appeared.

## MS courses Focus
MS courses Focus
The
MS Course Application Share Chart
zooms in on graduate
level courses that serve as entry points for MS students. Bars show
the percentage of all applications for each course that come from WNB
applicants versus Men.
Percent of applications by gender for MS level courses. Many
courses show healthy WNB representation in the applicant pool, yet
these shares are not always reflected in final hires.
For several introductory MS courses, WNB applicants make up a
significant fraction of the applicant pool. When combined with hiring
outcomes, the analysis revealed that
WNB candidates were not being hired in proportion to their
application rates
, especially in entry level TA roles where teaching experience is
first acquired.

## Instructor Hiring Divergence and Jensen Shannon Distance
Instructor Hiring Divergence and Jensen Shannon Distance
To understand where disparities originate, we needed a way to compare
the
distribution of genders in the applicant pool
with the
distribution of genders among hires
for each instructor and
course. For this we used
Jensen Shannon Distance (JSD)
.
Distribution of Jensen Shannon Distance values for WNB preferred
courses, Men preferred courses, and the overall course set. Higher
values indicate stronger divergence between applicant and hire
distributions for a course or instructor.
Why Jensen Shannon Distance?
JSD measures how different two probability distributions are and is
symmetric and bounded between 0 and 1
. A value of 0 means the
hiring distribution exactly matches the applicant distribution, and
values closer to 1 indicate strong divergence.
Unlike raw percentage gaps, JSD lets us aggregate across many
courses with different applicant counts and still compare them
fairly. It is also stable when some categories have small counts,
which made it well suited for our departmental scale data.
Using JSD, we could group courses into those where hiring favored
WNB applicants, those where hiring favored Men, and those that were
roughly aligned with the pool. This grouping was later tested with
t-tests and ANOVA to check which differences were statistically
significant.
The histogram shows that a subset of courses has
consistently high JSD values skewed toward Men
, indicating that
instructors in these courses hire Men at rates that diverge
significantly from the applicant pool composition. This provided
strong evidence that instructor level decisions, not just pipeline,
contribute to the observed disparities.

## Topic Modeling Insights
Topic Modeling Insights
To understand whether WNB and Men prefer different types of courses,
we applied topic modeling to course descriptions and grouped courses
into themes. Key takeaways are summarized below.
Topic modeling revealed that WNB applicants were more likely to
apply to
project based, programming intensive, and application focused
courses
, such as software engineering and design oriented classes.
Men were more likely to apply to
math heavy and theory oriented courses
, including algorithms,
machine learning theory, and systems style offerings.
These preference differences align with prior work on gendered
course choices, but they
did not fully explain the hiring gap
. Even in courses where
WNB formed a large share of the applicant pool, hiring patterns
still favored Men in several important MS entry level roles.

## Key Findings and Impact
Key Findings and Impact

### Instructor decisions drive much of the disparity
Instructor decisions drive much of the disparity:
Comparing JSD values and hiring rates showed that the largest
imbalances come from instructor level selection, not lack of WNB
applicants. Some instructors hired close to the pool distribution,
while others showed strong skew toward Men.

### WNB are under selected for entry level MS TA roles
WNB are under selected for entry level MS TA roles:
In several graduate gateway courses WNB application rates were high,
but hires lagged significantly behind their representation,
including an estimated
42.5% shortfall
in one entry level TA
cluster.

### Intersectional gaps matter
Intersectional gaps matter:
Analyses by race, international status, and their intersections
highlighted that some groups, such as international WNB applicants
from underrepresented racial backgrounds, experience compounded
disadvantages that would be invisible in gender only statistics.

### Policy influence
Policy influence:
The results informed
equity focused recommendations
that were
adopted by academic leadership for the 2025 hiring cycle, including
structured rubrics, bias training for instructors, and department
wide monitoring of demographic distributions in TA hiring.

### Long term contribution
Long term contribution:
This project demonstrates that TA hiring can and should be treated
as a measurable part of equity efforts in computing. The combination
of JSD based divergence metrics, traditional hypothesis tests, and
interactive dashboards provides a reusable blueprint for other
departments to audit their own processes.
Overall, the analysis showed that while application patterns and topic
preferences differ slightly by gender, the
largest disparities come from how instructors convert applicants
into hires
. This makes TA hiring an essential and previously overlooked
dimension of diversity work in computing education.
