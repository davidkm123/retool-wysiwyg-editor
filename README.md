## Retool WYSIWYG Editor

This is a custom component library for Retool that provides a WYSIWYG editor powered by CKEditor 5 in React.

## Installation

Requirements:
1. [Node.js](https://nodejs.org/) v20 or later installed in your development environment.
2. [Admin permissions](https://docs.retool.com/org-users/concepts/permission-groups#default-permission-groups) in Retool.
3. \[Optional\] If you are running self-hosted Retool, setting the [ALLOW_SAME_ORIGIN_OPTION, and SANDBOX_DOMAIN environment variables](https://docs.retool.com/self-hosted/guides/origin-sandbox) is recommended.

Steps:
1. Clone the repository
2. Run `npm install`
3. Run `npx retool-ccl login`
4. Run `npx retool-ccl publish`

## Usage

To use the editor in your Retool project, simply add the `HtmlEditor` or `MarkdownEditor` component to your canvas.

Access the components current value by using the `value` property. Set the value in the components `value` field within the components settings.

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.