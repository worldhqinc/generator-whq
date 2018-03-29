var Generator = require('yeoman-generator')

module.exports = class extends Generator {
    constructor (args, opts) {
        super(args, opts)
    }

    prompting () {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname.replace(/\s+/g, '-') // Default to current folder name
        }, {
            type: 'input',
            name: 'proxy',
            message: 'Local proxy',
            default: this.appname.replace(/\s+/g, '-') + '.test'
        }, {
            type: 'list',
            name: 'projectType',
            message: 'What type of project do you want to generate?',
            choices: ['Basic PHP', 'Wordpress Theme']
        }, {
            type: 'list',
            name: 'styleProcessor',
            message: 'What style processor do you want to use?',
            choices: ['Sass', 'PostCSS']
        }]).then(answers => {
            this.props = answers
        })
    }

    writing () {
        // copy configuration files
        // this.fs.copy(
        //     this.templatePath('.gitignore'),
        //     this.destinationPath('.gitignore')
        // )

        this.fs.copyTpl(
            this.templatePath('.node-version'),
            this.destinationPath('.node-version'), {
                version: process.version.replace('v', '')
            }
        )

        this.fs.copyTpl(
            this.templatePath('.editorconfig'),
            this.destinationPath('.editorconfig'), {
                version: process.version.replace('v', '')
            }
        )

        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'), {
                name: this.props.name,
                processor: this.props.styleProcessor
            }
        )

        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js'), {
                proxy: this.props.proxy,
                processor: this.props.styleProcessor
            }
        )

        this.fs.copy(
            this.templatePath('modernizr.js'),
            this.destinationPath('modernizr.js')
        )

        // copy application files
        this.fs.copy(
            this.templatePath('js/main.js'),
            this.destinationPath('js/main.js')
        )

        if (this.props.styleProcessor === 'Sass') {
            this.fs.copy(
                this.templatePath('scss/main.scss'),
                this.destinationPath('scss/main.scss')
            )
        }

        if (this.props.styleProcessor === 'PostCSS') {
            this.fs.copy(
                this.templatePath('css/main.css'),
                this.destinationPath('css/main.css')
            )
        }

        this.fs.copyTpl(
            this.templatePath('index.php'),
            this.destinationPath('index.php'), {
                name: this.props.name,
                projectType: this.props.projectType
            }
        )

        if (this.props.projectType === 'Wordpress Theme') {
            this.fs.copyTpl(
                this.templatePath('style.css'),
                this.destinationPath('style.css'), {
                    name: this.props.name
                }
            )

            this.fs.copy(
                this.templatePath('header.php'),
                this.destinationPath('header.php')
            )

            this.fs.copy(
                this.templatePath('footer.php'),
                this.destinationPath('footer.php')
            )

            this.fs.copy(
                this.templatePath('partials/service-worker.php'),
                this.destinationPath('partials/service-worker.php')
            )
        }

        // install dependencies
        this.installDependencies({ bower: false })
            .then(() => this.spawnCommand('npm', ['run', 'watch']))
    }
}
