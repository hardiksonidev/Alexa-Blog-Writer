Alexa Blog Writer – Lambda Function

This project contains the AWS Lambda backend for the Alexa Blog Writer Skill.
The skill allows users to start a blog by title, add paragraphs, include references, and publish posts directly to WordPress—all using voice commands with Alexa.

🚀 Features

StartIntentHandler → Start a new blog with a given title

ParagraphIntentHandler → Add paragraphs to the blog

ReferenceIntentHandler → Add a reference or source link

PublishIntentHandler → Publish the blog directly to a connected WordPress site

Supports multi-turn conversations in sequence:

User → Alexa, open blog assistant  
Alexa → Welcome to Blog Writer. You can say start a blog to begin.  
User → Start blog titled Healthcare AI  
Alexa → Starting blog titled Healthcare AI. What's your first paragraph?  
User → Write a paragraph about digital marketing  
Alexa → Paragraph added. Would you like to add another?  
User → Publish blog  
Alexa → Your blog has been published. You can view it at <WordPress URL>.  

🛠️ Project Structure
├── handlers/
│   ├── ParagraphIntentHandler.js   # Handles adding paragraphs
│   ├── PublishIntentHandler.js     # Publishes the blog to WordPress
│   ├── ReferenceIntentHandler.js   # Handles references/URLs
│   ├── StartIntentHandler.js       # Handles starting new blog
│
├── index.js                        # Entry point (registers all handlers)
├── package.json
└── README.md

📦 Setup & Deployment
1. Clone the repo
git clone https://github.com/hardiksonidev/Alexa-Blog-Writer.git
cd alexa-blog-writer

2. Install dependencies
npm install

3. Configure environment variables

The WordPress publishing feature requires authentication. Add these to your Lambda environment variables:

WORDPRESS_URL → Your WordPress site URL

WORDPRESS_USER → Your WordPress username

WORDPRESS_APP_PASS → Your WordPress Application Password

Example:

WORDPRESS_URL=https://yourblog.com
WORDPRESS_USER=yourusername
WORDPRESS_APP_PASS=abcd efgh ijkl mnop

4. Deploy to AWS Lambda

Zip the project (npm install --production first to reduce size)

Upload to AWS Lambda

Link the Lambda ARN in your Alexa Developer Console > Endpoint

🗣️ Alexa Interaction Model
Invocation Name
blog assistant

Intents

StartIntent → create a blog titled {title}

ParagraphIntent → write about {paragraph}

ReferenceIntent → add reference {url}

PublishIntent → publish my blog

Custom Slot Types

BlogTitle → Example values: tech innovation, climate change, healthcare AI

ParagraphSlot → Example values: hardik soni, web development, digital marketing, blockchain, healthcare, artificial intelligence

🔐 Security & Privacy

The skill does not store any user data.

WordPress credentials are securely stored in AWS Lambda environment variables.

Ensure your Privacy Policy and Terms of Use are linked when submitting to certification.

📜 License

MIT License. Free to use and modify.
