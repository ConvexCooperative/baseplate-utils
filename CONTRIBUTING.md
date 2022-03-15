# Publishing

1. Switch to main branch
2. `git pull`
3. `pnpm install`
4. `pnpm exec changeset version`
5. `git add . && git commit -m "VERSION NUMBER GOES HERE"`
6. `pnpm exec changeset publish`
