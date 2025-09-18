# How to update this package?

### Pre-Requisites

1. From the root of the project run `git checkout develop`. We generally work off of this branch

2. create a .npmrc file like so. Replace "your_token" with one generated from github (https://github.com/settings/tokens):

   ```
   registry=https://registry.npmjs.org/
   @alluradirect:registry=https://npm.pkg.github.com/
   //npm.pkg.github.com/:_authToken=your_token
   ```

3. run `npm i` in the root of this project

### Updating the Package

1. Make changes to package (and preferably also add tests)
2. Make sure to export and newly-added features in a top-level index.ts file (business/index.ts for example)
3. Run `npm run build:prod` (or any of its variants - see package.json for details), wait for build to complete and then select the semver version change. Select yes when prompted that newly added files will not be added (bug from np)
4. After package is updated a new tab should open in your browser to publish the release which you should do
5. Update any apps that require the updated changes (react-applications, mobile, etc)

### Recommendation

- I highly recommend testing changes locally in an app (react-applications for example), before going through the full process of creating a new release and updating the package.json of dependant apps.
- Test locally then, once feature is working move to shared with tests so that it can be used in the other app.
- If a feature is only used in one app then its not worth moving to shared. Only move logic to this repo if its needed in multiple apps

### Patching a Version

# Create a new branch from tag v3.30.1
git checkout -b newbranch v3.30..1

# Do some work and add and commit it
git add .
git commit -m 'something happened'

# working tree clean? go ahead
# build it first! else you get a weird ...<pkgname>/src cannot be found
npm run build

# publish it - use git tag to review placement of semvar versioning for no clash; last option to enter manually
np --any-branch

> new version is 3.30.25

# update react-applications package.json
  "dependencies": {
    "@alluradirect/react": "3.30.25",

# build react-applications
npm i
npm run deploy:staging

# all good?


### Troubleshooting

- Authentication error. Use 'npm whoami' to troubleshoot
- If this happens, your github token is invalid.
  - Replace "your_token" in .npmrc with one generated from github (https://github.com/settings/tokens):

## Resources

https://prateeksurana.me/blog/react-library-with-typescript/

https://zellwk.com/blog/publish-to-npm/

https://andreybleme.com/2020-05-31/hosting-private-npm-packages-for-free/

https://blog.anoff.io/2020-07-private-npm-package-github/

## FAQ

Query keys include undefined?

- If a query key includes undefined it is not a bug, usually this occurs when a param passed into a react query hook is optional
