## Project Files Structure
- Group all of your "view" files in a shared directory. These would be HTML files, other than your index.html.
- Same thing with css files, JS files, and images. These three would groups could then also go inside another directory, commonly called "assets"
- I notice you have a DS_Store file. That is a nothing file and should be added to your .gitignore so it doesn't get commited

- 4 spaced tabs... interesting choice 😉
- HTML indentation for the index is on point 👌, got a bit off in the products file
- CSS is looking good. Little double dot thing going on for line 173

- In the checkout file you were adding and removing classes. Looked like you could have used `.toggle()` as a bit of a refactor
- Saw in some places you were wrapping `this` in jQuery: `validateZipcode($(this));` Not 100% sure, so double check me, but you probably don't need to do that there since you are then chaining any jQuery methods off of it.
- Your `validateXYZ` functions appear to be running the same logic over and over again, just with different inputs. That is a great oppertunity for refactoring. DRY 🔥 `validateBill` is more than 40 lines of repeditive code.
- Same deal for your `sortPrice` functions. Could just be one function.

Overall your team did a good job keeping you code well formatted. There were many oppertunities to refactor duplicate code into smaller single purpose functions.
