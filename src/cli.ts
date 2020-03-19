#!/usr/bin/env node

import meow from 'meow';
import globmv from './index';

const cli = meow(
  `
	Usage
    $ globmv [options] <source-glob> <dest-dir>

  Options
    --help, -h      Display help.

    --version, -v   Display mvglob version.

    --noclobber     Don't overwrite an existing destination file.

    --cwd           The current working directory in which to search.
                    Defaults to process.cwd().

    --root          The place where patterns starting with \`/\` will be mounted
                    onto.

    --dot           Include .dot files in normal matches and globstar
                    matches. Note that an explicit dot in a portion of the
                    pattern will always match dot files.

    --nomount       By default, a pattern starting with a forward-slash will
                    be "mounted" onto the root setting, so that a valid
                    filesystem path is returned. Set this flag to disable
                    that behavior.

    --mark          Add a \`/\` character to directory matches.

    --debug         Set to enable debug logging in minimatch and glob.

    --nobrace       Do not expand {a,b} and {1..3} brace sets.

    --noglobstar    Do not match ** against multiple filenames. (Ie, treat
                    it as a normal * instead).

    --noext         Do not match +(a|b) "extglob" patterns.

    --nocase        Perform a case-insensitive match.

    --matchBase     Perform a basename-only match if the pattern does not
                    contain any slash characters. That is, *.js would be
                    treated as equivalent to **/*.js, matching all js files
                    in all directories.

    --nodir         Do not match directories, only files.

    --ignore        Add a pattern to exclude matches. Note: ignore patterns
                    are always in dot:true mode, regardless of any other
                    settings.

    --follow        Follow symlinked directories when expanding \`**\` patterns.

	Example
	  $ globmv source/**/*.png destination/
`,
  {
    flags: {
      help: { type: 'boolean', default: false, alias: 'h' },
      version: { type: 'boolean', default: false, alias: 'v' },
      noclobber: { type: 'boolean', default: false },

      // minimatch options
      cwd: { type: 'string' },
      root: { type: 'string' },
      dot: { type: 'boolean', default: false },
      nomount: { type: 'boolean', default: false },
      mark: { type: 'boolean', default: false },
      debug: { type: 'boolean', default: false },
      nobrace: { type: 'boolean', default: false },
      noglobstar: { type: 'boolean', default: false },
      noext: { type: 'boolean', default: false },
      nocase: { type: 'boolean', default: false },
      matchBase: { type: 'boolean', default: false },
      nodir: { type: 'boolean', default: false },
      ignore: { type: 'string' },
      follow: { type: 'boolean', default: false },
    },
  },
);

const [source, destination] = cli.input;

(async () => {
  if (!cli.input.length) cli.showHelp();
  if (cli.flags.help) cli.showHelp();
  if (cli.flags.version) cli.showVersion();
  await globmv(source, destination, cli.flags);
})();
