# Diff Details

Date : 2025-04-10 15:36:56

Directory d:\\Project\\Minor- Rebranded\\StuddyBuddy\\studybuddy\\src

Total : 98 files,  4460 codes, 21 comments, 456 blanks, all 4937 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [backend/controllers/auth.controller.js](/backend/controllers/auth.controller.js) | JavaScript | -75 | -1 | -19 | -95 |
| [backend/controllers/chat.controller.js](/backend/controllers/chat.controller.js) | JavaScript | -47 | 0 | -19 | -66 |
| [backend/controllers/connection.controller.js](/backend/controllers/connection.controller.js) | JavaScript | -141 | -3 | -39 | -183 |
| [backend/controllers/forum.controller.js](/backend/controllers/forum.controller.js) | JavaScript | -122 | 0 | -20 | -142 |
| [backend/controllers/post.controller.js](/backend/controllers/post.controller.js) | JavaScript | -101 | -20 | -23 | -144 |
| [backend/controllers/quiz.controller.js](/backend/controllers/quiz.controller.js) | JavaScript | -175 | -31 | -42 | -248 |
| [backend/controllers/refresher.controller.js](/backend/controllers/refresher.controller.js) | JavaScript | -2 | 0 | -5 | -7 |
| [backend/controllers/studyGroup.controller.js](/backend/controllers/studyGroup.controller.js) | JavaScript | -52 | -1 | -17 | -70 |
| [backend/controllers/user.controller.js](/backend/controllers/user.controller.js) | JavaScript | -182 | -1 | -30 | -213 |
| [backend/lib/cloudinary.js](/backend/lib/cloudinary.js) | JavaScript | -9 | 0 | -3 | -12 |
| [backend/lib/db.js](/backend/lib/db.js) | JavaScript | -10 | 0 | -1 | -11 |
| [backend/lib/multer.js](/backend/lib/multer.js) | JavaScript | -20 | -1 | -6 | -27 |
| [backend/lib/openai.js](/backend/lib/openai.js) | JavaScript | -32 | 0 | -5 | -37 |
| [backend/middleware/auth.middleware.js](/backend/middleware/auth.middleware.js) | JavaScript | -23 | -1 | -8 | -32 |
| [backend/models/answers.model.js](/backend/models/answers.model.js) | JavaScript | -11 | 0 | -5 | -16 |
| [backend/models/chat.model.js](/backend/models/chat.model.js) | JavaScript | -13 | 0 | -4 | -17 |
| [backend/models/connectionRequest.model.js](/backend/models/connectionRequest.model.js) | JavaScript | -22 | 0 | -4 | -26 |
| [backend/models/post.model.js](/backend/models/post.model.js) | JavaScript | -19 | 0 | -3 | -22 |
| [backend/models/questions.model.js](/backend/models/questions.model.js) | JavaScript | -10 | 0 | -3 | -13 |
| [backend/models/quiz.model.js](/backend/models/quiz.model.js) | JavaScript | -15 | 0 | -3 | -18 |
| [backend/models/quizResult.model.js](/backend/models/quizResult.model.js) | JavaScript | -13 | 0 | -3 | -16 |
| [backend/models/resource.model.js](/backend/models/resource.model.js) | JavaScript | -9 | 0 | -3 | -12 |
| [backend/models/studyGroup.model.js](/backend/models/studyGroup.model.js) | JavaScript | -17 | 0 | -4 | -21 |
| [backend/models/user.model.js](/backend/models/user.model.js) | JavaScript | -45 | 0 | -5 | -50 |
| [backend/routes/auth.route.js](/backend/routes/auth.route.js) | JavaScript | -9 | 0 | -4 | -13 |
| [backend/routes/chat.route.js](/backend/routes/chat.route.js) | JavaScript | -9 | 0 | -5 | -14 |
| [backend/routes/connection.route.js](/backend/routes/connection.route.js) | JavaScript | -12 | -2 | -4 | -18 |
| [backend/routes/forum.route.js](/backend/routes/forum.route.js) | JavaScript | -12 | -4 | -7 | -23 |
| [backend/routes/post.route.js](/backend/routes/post.route.js) | JavaScript | -11 | 0 | -4 | -15 |
| [backend/routes/quiz.route.js](/backend/routes/quiz.route.js) | JavaScript | -15 | 0 | -9 | -24 |
| [backend/routes/refresher.route.js](/backend/routes/refresher.route.js) | JavaScript | -6 | 0 | -3 | -9 |
| [backend/routes/studyGroup.route.js](/backend/routes/studyGroup.route.js) | JavaScript | -11 | 0 | -5 | -16 |
| [backend/routes/user.route.js](/backend/routes/user.route.js) | JavaScript | -14 | 0 | -7 | -21 |
| [backend/server.js](/backend/server.js) | JavaScript | -54 | -5 | -16 | -75 |
| [studybuddy/src/App.css](/studybuddy/src/App.css) | CSS | 0 | 0 | 1 | 1 |
| [studybuddy/src/App.js](/studybuddy/src/App.js) | JavaScript | 66 | 0 | 12 | 78 |
| [studybuddy/src/api/chatApi.js](/studybuddy/src/api/chatApi.js) | JavaScript | 17 | 0 | 5 | 22 |
| [studybuddy/src/components/Layout.js](/studybuddy/src/components/Layout.js) | JavaScript | 14 | 0 | 2 | 16 |
| [studybuddy/src/components/NavBar/ChatSidebar.js](/studybuddy/src/components/NavBar/ChatSidebar.js) | JavaScript | 60 | 2 | 10 | 72 |
| [studybuddy/src/components/NavBar/ChatSidebar.module.css](/studybuddy/src/components/NavBar/ChatSidebar.module.css) | CSS | 46 | 0 | 7 | 53 |
| [studybuddy/src/components/NavBar/GroupSidebar.js](/studybuddy/src/components/NavBar/GroupSidebar.js) | JavaScript | 124 | 4 | 18 | 146 |
| [studybuddy/src/components/NavBar/GroupSidebar.module.css](/studybuddy/src/components/NavBar/GroupSidebar.module.css) | CSS | 118 | 0 | 17 | 135 |
| [studybuddy/src/components/NavBar/NavBar.js](/studybuddy/src/components/NavBar/NavBar.js) | JavaScript | 100 | 0 | 16 | 116 |
| [studybuddy/src/components/NavBar/NavBar.module.css](/studybuddy/src/components/NavBar/NavBar.module.css) | CSS | 123 | 2 | 25 | 150 |
| [studybuddy/src/components/Post/Post.js](/studybuddy/src/components/Post/Post.js) | JavaScript | 176 | 1 | 16 | 193 |
| [studybuddy/src/components/Post/PostAction.js](/studybuddy/src/components/Post/PostAction.js) | JavaScript | 8 | 0 | 0 | 8 |
| [studybuddy/src/components/Post/PostCreation.js](/studybuddy/src/components/Post/PostCreation.js) | JavaScript | 96 | 0 | 12 | 108 |
| [studybuddy/src/components/RecommendedUser.js](/studybuddy/src/components/RecommendedUser.js) | JavaScript | 123 | 0 | 12 | 135 |
| [studybuddy/src/components/Sidebar.js](/studybuddy/src/components/Sidebar.js) | JavaScript | 70 | 0 | 4 | 74 |
| [studybuddy/src/components/User/AboutSection.js](/studybuddy/src/components/User/AboutSection.js) | JavaScript | 48 | 0 | 2 | 50 |
| [studybuddy/src/components/User/EducationSection.js](/studybuddy/src/components/User/EducationSection.js) | JavaScript | 113 | 0 | 6 | 119 |
| [studybuddy/src/components/User/ProfileHeader.js](/studybuddy/src/components/User/ProfileHeader.js) | JavaScript | 236 | 0 | 24 | 260 |
| [studybuddy/src/components/User/ProfileHeader.module.css](/studybuddy/src/components/User/ProfileHeader.module.css) | CSS | 107 | 0 | 23 | 130 |
| [studybuddy/src/components/User/ResourcesSection.js](/studybuddy/src/components/User/ResourcesSection.js) | JavaScript | 169 | 5 | 16 | 190 |
| [studybuddy/src/components/forum/Answer.js](/studybuddy/src/components/forum/Answer.js) | JavaScript | 95 | 2 | 13 | 110 |
| [studybuddy/src/components/forum/AskQuestion.js](/studybuddy/src/components/forum/AskQuestion.js) | JavaScript | 126 | 1 | 18 | 145 |
| [studybuddy/src/components/forum/ForumList.js](/studybuddy/src/components/forum/ForumList.js) | JavaScript | 125 | 0 | 13 | 138 |
| [studybuddy/src/components/forum/ImageUploader.js](/studybuddy/src/components/forum/ImageUploader.js) | JavaScript | 62 | 2 | 12 | 76 |
| [studybuddy/src/components/forum/QuestionDetail.js](/studybuddy/src/components/forum/QuestionDetail.js) | JavaScript | 184 | 0 | 24 | 208 |
| [studybuddy/src/index.css](/studybuddy/src/index.css) | CSS | 3 | 1 | 1 | 5 |
| [studybuddy/src/index.js](/studybuddy/src/index.js) | JavaScript | 20 | 0 | 5 | 25 |
| [studybuddy/src/lib/axios.js](/studybuddy/src/lib/axios.js) | JavaScript | 8 | 0 | 1 | 9 |
| [studybuddy/src/lib/utils.js](/studybuddy/src/lib/utils.js) | JavaScript | 3 | 0 | 1 | 4 |
| [studybuddy/src/pages/PostPage.js](/studybuddy/src/pages/PostPage.js) | JavaScript | 31 | 0 | 7 | 38 |
| [studybuddy/src/pages/about/About.js](/studybuddy/src/pages/about/About.js) | JavaScript | 22 | 0 | 11 | 33 |
| [studybuddy/src/pages/auth/Auth.js](/studybuddy/src/pages/auth/Auth.js) | JavaScript | 59 | 2 | 5 | 66 |
| [studybuddy/src/pages/auth/Auth.module.css](/studybuddy/src/pages/auth/Auth.module.css) | CSS | 222 | 1 | 33 | 256 |
| [studybuddy/src/pages/auth/Login.js](/studybuddy/src/pages/auth/Login.js) | JavaScript | 54 | 4 | 7 | 65 |
| [studybuddy/src/pages/auth/Register.js](/studybuddy/src/pages/auth/Register.js) | JavaScript | 76 | 4 | 9 | 89 |
| [studybuddy/src/pages/chat/MeetPage.js](/studybuddy/src/pages/chat/MeetPage.js) | JavaScript | 35 | 0 | 9 | 44 |
| [studybuddy/src/pages/chat/SingleChatPAge.js](/studybuddy/src/pages/chat/SingleChatPAge.js) | JavaScript | 126 | 3 | 16 | 145 |
| [studybuddy/src/pages/chat/SingleGroupPage.js](/studybuddy/src/pages/chat/SingleGroupPage.js) | JavaScript | 163 | 3 | 21 | 187 |
| [studybuddy/src/pages/explore/Explore.js](/studybuddy/src/pages/explore/Explore.js) | JavaScript | 50 | 1 | 11 | 62 |
| [studybuddy/src/pages/explore/components/GameBasedRelief.js](/studybuddy/src/pages/explore/components/GameBasedRelief.js) | JavaScript | 279 | 28 | 47 | 354 |
| [studybuddy/src/pages/explore/components/SenseBasedRelief.js](/studybuddy/src/pages/explore/components/SenseBasedRelief.js) | JavaScript | 345 | 14 | 42 | 401 |
| [studybuddy/src/pages/explore/components/TextBasedRelief.js](/studybuddy/src/pages/explore/components/TextBasedRelief.js) | JavaScript | 258 | 0 | 30 | 288 |
| [studybuddy/src/pages/explore/components/ui/button.js](/studybuddy/src/pages/explore/components/ui/button.js) | JavaScript | 32 | 0 | 7 | 39 |
| [studybuddy/src/pages/explore/components/ui/card.js](/studybuddy/src/pages/explore/components/ui/card.js) | JavaScript | 34 | 0 | 10 | 44 |
| [studybuddy/src/pages/explore/components/ui/tabs.js](/studybuddy/src/pages/explore/components/ui/tabs.js) | JavaScript | 38 | 0 | 8 | 46 |
| [studybuddy/src/pages/feature/Feature.js](/studybuddy/src/pages/feature/Feature.js) | JavaScript | 22 | 0 | 10 | 32 |
| [studybuddy/src/pages/forum/Forum.js](/studybuddy/src/pages/forum/Forum.js) | JavaScript | 16 | 0 | 4 | 20 |
| [studybuddy/src/pages/home/HomePage.js](/studybuddy/src/pages/home/HomePage.js) | JavaScript | 60 | 0 | 12 | 72 |
| [studybuddy/src/pages/home/HomePage.module.css](/studybuddy/src/pages/home/HomePage.module.css) | CSS | 21 | 0 | 4 | 25 |
| [studybuddy/src/pages/landing/Footer.js](/studybuddy/src/pages/landing/Footer.js) | JavaScript | 77 | 0 | 7 | 84 |
| [studybuddy/src/pages/landing/Header.js](/studybuddy/src/pages/landing/Header.js) | JavaScript | 60 | 0 | 7 | 67 |
| [studybuddy/src/pages/landing/Landing.module.css](/studybuddy/src/pages/landing/Landing.module.css) | CSS | 207 | 7 | 35 | 249 |
| [studybuddy/src/pages/landing/LandingPage.js](/studybuddy/src/pages/landing/LandingPage.js) | JavaScript | 24 | 0 | 9 | 33 |
| [studybuddy/src/pages/landing/Main.js](/studybuddy/src/pages/landing/Main.js) | JavaScript | 168 | 0 | 7 | 175 |
| [studybuddy/src/pages/quiz/CreateQuiz.js](/studybuddy/src/pages/quiz/CreateQuiz.js) | JavaScript | 157 | 0 | 16 | 173 |
| [studybuddy/src/pages/quiz/Home.js](/studybuddy/src/pages/quiz/Home.js) | JavaScript | 120 | 0 | 14 | 134 |
| [studybuddy/src/pages/quiz/Quiz.js](/studybuddy/src/pages/quiz/Quiz.js) | JavaScript | 21 | 0 | 3 | 24 |
| [studybuddy/src/pages/quiz/QuizGen.js](/studybuddy/src/pages/quiz/QuizGen.js) | JavaScript | 58 | 0 | 9 | 67 |
| [studybuddy/src/pages/quiz/StartQuiz.js](/studybuddy/src/pages/quiz/StartQuiz.js) | JavaScript | 161 | 3 | 23 | 187 |
| [studybuddy/src/pages/quiz/StartQuizById.js](/studybuddy/src/pages/quiz/StartQuizById.js) | JavaScript | 163 | 0 | 19 | 182 |
| [studybuddy/src/pages/reward/Reward.js](/studybuddy/src/pages/reward/Reward.js) | JavaScript | 9 | 0 | 2 | 11 |
| [studybuddy/src/pages/search/Search.js](/studybuddy/src/pages/search/Search.js) | JavaScript | 123 | 1 | 11 | 135 |
| [studybuddy/src/pages/user/ProfilePage.js](/studybuddy/src/pages/user/ProfilePage.js) | JavaScript | 42 | 0 | 12 | 54 |
| [studybuddy/src/utils/dateUtils.js](/studybuddy/src/utils/dateUtils.js) | JavaScript | 5 | 0 | 1 | 6 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details