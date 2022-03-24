# Contributing Guidelines

Follow these requirements for contributing to the repository. If we need to consistently rebase your code, I will have you send me it to manually review and will push it myself.

- [Contributing Guidelines](#contributing-guidelines)
  - [Cloning The Repository](#cloning-the-repository)
  - [Fetch and Pull](#fetch-and-pull)
  - [Checkout Your Teams Branch](#creating-your-own-branch)
  - [Make Edits](#make-edits)
  - [Stage and Commit](#stage-and-commit)
  - [Make a Pull Request](#make-a-pull-request)
    - [Important](#important)
  - [Reviewing a Pull Request](#reviewing-a-pull-request)

## Cloning The Repository

Clone the repository into your preferred directory

`git clone https://github.com/umgc-cmsc-495-group-1/image-sharing-app.git`

change directories into the cloned repository

`cd image-sharing-app`

intall all of the dependencies

`npm install`

run the precommit initializer script

`./git-hooks/init`

<b><u>Ensure that you have initialized this script</u></b>

## Fetch and Pull

If you are working on a feature that has yet to be added to the repository, then you need to only check and see what has been updated. You can run a few commands to see this.

`git status` will tell you how far behind or ahead of the master branch you are.

`git log` will show you all of the commits, merge, and pull requests to the branch, and who made them. There is also a SHA hashed string that you can look up through the repository to locate the exact item.

If you need to update your local branch after the master has had updates then run the following items. Just ensure that you are in your local branch before doing so - `git checkout TEAM`

`git fetch origin master`

`git pull origin master`

If someone has helped you out with something in your branch, then pushed code to your repository and you need to update your local branch, you can run the following commands. Same concept applies, ensure you are in your branch by running the checkout command above.

`git fetch origin TEAM`

`git pull origin TEAM`

where `TEAM` is your team name

At no point should anyone be working in the master branch, if you run the command `git branch` and it has the asterisk `*` next to the word master -> `* master`, you need to switch to your feature branch (your team).

The goal is to have everyone work on their own branch, and push the work to the repository, then merge into master once it passes the tests.

## Checkout Your Teams Branch

`git checkout -b TEAM` -> EXAMPLE: git checkout -b components

## Make Edits

Make any necessary edits to the documents that you think should be contributed

## Stage and Commit

`npm run stage`

`git commit -m "ENTER YOUR CHANGES HERE"`

`git push -u origin TEAM`

<b><u>The -u is important</u></b> we want individuals to have their upstream branch se to their respective,
teams this way we do not run into merge conflicts on the master branch.

You will on have to do this the first time, then moving forward you can just do the following `git push origin TEAM`

## Make a Pull Request

Go to GitHub organization and make a pull request and request a review from another member of the team.

### Important

Never merge or make a pull request to the master branch, this is our default branch and used to restore from. All of our code will eventually be added to the master branch.

The process will be features added to individual teams, merged into the development branch to check for breaking changes, then commiting to master.

## Reviewing a Pull Request

<b><u>Remember Not to delete the branch</u></b> When you review the pull request, we need to keep commit history for tracking work.
