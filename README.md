# ArgueAI

ArgueAI is a unique tool that simulates a debate between two Artificial Intelligence (AI) powered agents, leveraging the capabilities of search engine and language model technologies. This AI-based debate tool implements the power of the OpenAI and Tavily APIs for its NLP models.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure that you have the latest version of npm and Python installed on your machine. The application requires NodeJS to manage the frontend and Python for the backend.

### Installation

1. Clone the repository to your local machine.
```bash
git clone https://github.com/yourusername/ArgueAI.git
```
2. Navigate to Server Folder, and install the required dependencies using pip.
```bash
cd ArgueAI/server
pip install -r requirements.txt
```
3. Create a .env file in the `server` directory. Here, you will need to add your OpenAI API Key and Tavily API Key as shown below:
```bash
OPENAI_API_KEY=your-api-key-here
TAVILY_API_KEY=your-api-key-here
```
4. Navigate to the client directory. Here, install the required dependencies using npm.
```bash
cd ArgueAI/client
npm install
```
### Running the Application

Start the backend server first.
```bash
cd ArgueAI/server
python flask_server.py
```
Next, start the frontend.
```bash
cd ArgueAI/client
npm start
```
The frontend of the application runs on `localhost:3000` by default, and the backend runs on `localhost:9988`.

### Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License

Distributed under the MIT License. See `LICENSE` for more information.

-Enjoy ArgueAI, Happy Coding!