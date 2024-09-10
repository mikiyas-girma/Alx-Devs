# Alx_Devs

## Introduction
Alx_Devs is a platform designed to connect developers for collaborative projects, enabling them to build strong portfolios and gain valuable experience. Whether you're looking to contribute to an open-source initiative or join a startup team, Alx_Devs helps you find projects that match your expertise and passion.

**Deployed Site**: [Alx_Devs](https://mikiyas-girma.github.io/Alx-Devs/)  
<!-- **Project Blog Article**: [Final Project Blog](link-to-your-blog-article)   -->

## Installation
To run the Alx_Devs project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/mikiyas-girma/Alx-Devs.git
    cd alx_devs
    ```

2. **Set up the virtual environment for the backend**:
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows, use: venv\Scripts\activate
    ```

3. **Install backend dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Set up the frontend**:
    ```bash
    cd frontend
    npm install
    ```

5. **Run the backend server**:
    ```bash
    cd backend
    py -m api.v1.app
    ```

6. **Run the frontend server**:
    ```bash
    cd frontend
    npm run dev
    ```

## Usage
1. **Registration**: Sign up by providing your username, email, and password.
2. **Login**: Access your account using your registered email and password.
3. **Create Project**: Post new projects with detailed descriptions and requirements.
4. **Join Projects**: Browse and request to join projects that interest you.
5. **Manage Requests**: Approve or reject requests to join your project.

## Screenshots
*Landing page*

<div style="display: flex; justify-content: space-between;">
    <img src="/assets/pixel7.png" alt="Home Page" style="width: 48%;"/>
    <img src="/assets/pixel2.png" alt="Home Page" style="width: 48%;"/>
</div>

![Home Page](/assets/xdr.png)

*This is the page where created project get listed*
![Project Listing Page](/assets/homepage.png)

*This is the profile page in Dark Mode nb. the web app is have both light & dark mode*
![Profile Page](/assets/profilepage.png)

*this is the page where users after logged in create a project and find potential teammates*
![Project Creation Page](/assets/createprojectpage.png)

## Contributing
We welcome contributions to Alx_Devs! To contribute:

1. **Fork the repository**.
2. **Create a new branch**:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Make your changes**.
4. **Commit your changes**:
    ```bash
    git commit -m "Add feature description"
    ```
5. **Push to the branch**:
    ```bash
    git push origin feature/your-feature-name
    ```
6. **Open a pull request**.

## Related Projects
- [Anonymously ask & reply telegram bot](https://github.com/mikiyas-girma/YouBotv2)

## Licensing
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
