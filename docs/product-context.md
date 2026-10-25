# Product context

## DocAssist (the long-term product)

DocAssist is a doctor–patient care platform that will be licensed to premium clinics and hospitals in India. Doctors record symptoms, labs and documents, and an AI helps with diagnosis and medicine choice, but the doctor always decides. Patients book appointments, track their medicines and reach the care team when they need help. Doctors can see recovery and adherence between visits. The positioning is "the care loop between visits": DocAssist connects to a hospital's existing record system instead of replacing it.

Product brief: https://claude.ai/artifact/4PZAP9pp7sSV4B8DZNqNfz

## MediPulse (Phase 1, this repo)

MediPulse is the patient medicine reminder app. It comes first because it is useful on its own, it can be built by one developer, and it becomes the patient half of DocAssist later.

**Who it's for:** older patients in India, especially those on long-term medicines such as diabetes and blood pressure tablets, and the family members who help them.

**Principles**

- Large text and big buttons, with one main action per card. Many users are over 60.
- Prescriptions use the Indian notation (1-0-1 means morning and night), and the app shows it the same way.
- Reminders must fire on time even with no internet, in battery saver mode and after the phone restarts.
- Missed doses are recorded for the patient's own reference. In the pilot, no doctor reviews them.
- The app never gives medical advice. If someone feels unwell, it tells them to contact their doctor, and to call 112 for chest pain, trouble breathing or fainting.
- Languages: English, Hindi and Kannada.

**Pilot:** Android only, with patients of a few doctors the founder knows. Google Play requires a closed test with at least 12 testers for 14 days first.
