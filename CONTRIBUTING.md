# Setup

## Frontend
cd frontend
npm install
npm run dev

## Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Branch Workflow

- Do not push directly to main
- Create your own branch
- Pull latest main before working
- Push changes to your branch
- Merge after review

# Commit Messages

Use clear commit messages.

Examples:
- Added login page
- Fixed navbar bug
- Implemented audit context

# Coding Guidelines

- Keep components modular
- Use Tailwind for styling
- Avoid unnecessary duplication
- Use meaningful variable names

# Pull Requests

- Ensure app runs before submitting
- Pull latest main before merging
- Resolve conflicts carefully

# Information Update

- If you find any info which is updated/changed according to infromation used in this project, update the info or you can contact us about it
- Or directly create your branch, pull main, commit changes, push in it, then merge the main with it.
