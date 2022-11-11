A bit of a pre-flight checklist that you need to go through first and the first

- Confirm that any plugins you're using are available for Craft 4.
- Update the Craft 3 Site to the latest version.
- Update the plugins to the latest version.
- Fix all deprecation warnings. You'll find a list of warnings in admin panel under utilities, deprecation warnings.
- Make sure you don’t have any pending or active jobs in your queue.

1. Run `php craft project-config/rebuild` and allow any new background tasks to complete.
2. Update DDEV php to 8.1 and add "php": "8.1" to composer.json.
3. Remove `aelvan/imager` plugin ~ `ddev composer remove aelvan/imager`.
4. Edit your project’s `composer.json` to require `"craftcms/cms": "^4.0.0"`.
5. Run `composer update`.
6. Make any required changes to your [configuration](https://craftcms.com/docs/4.x/upgrade.html#configuration).
7. Run `php craft migrate/all`.
## YOU'RE NEARLY DONE
8. Upgrade `vlucas/phpdotenv` plugin to `4.0`.
9. Edit your project’s `index.php`, replace:

`(new Dotenv\Dotenv(CRAFT_BASE_PATH))->load();` with

        $dotenv = Dotenv\Dotenv::createMutable(CRAFT_BASE_PATH, '.env'); 
        $dotenv->load();

10. Replace all `{%- spaceless %}`, with `{%- apply spaceless %}`.
11. Replace all `{%- endspaceless %}`, with `{%- endapply %}`.
12. Edit `templates/_macros.twig`, `isEditable` is not defined in craftcms 4, use `currentUser and entry is defined`.
13. Twig 3 removed support for the `if` param in `{% for %}` tags, they suggested you use `|filter` instead. But you can just add an if statement inside the `{% for %}`.
14. Edit `templates/_includes/form.twig`, replace `{% for field in tab.getFields() %}` with `{% for field in form.getFieldLayout().customFields %}`.
