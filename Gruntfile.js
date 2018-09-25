
module.exports = function (grunt) {

    grunt.initConfig({
        ts: {
            default: {
                tsconfig: './tsconfig.json'
            }
        },
        symlink: {
            expanded: {
                files: [
                    { src: ['.env'], cwd: __dirname, dest: './prod' },
                    { src: ['web/views/*.ejs'], cwd: __dirname, dest: './prod' }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-symlink');

    grunt.registerTask('default', ['symlink']);
    grunt.registerTask('symlink', ['symlink']);
    
}