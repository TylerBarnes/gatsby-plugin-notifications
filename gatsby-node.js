/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const notifier = require(`node-notifier`)
const path = require(`path`)
const player = require(`play-sound`)((opts = {}))
const open = require(`open`)

const title = path.basename(process.cwd())
const icon = path.join(__dirname, "assets/Gatsby_Monogram.png")
const closeLabel = `close`

const playSound = (soundName) => {
  if (soundName) {
    const sound = path.join(__dirname, `assets/sounds/${soundName}.wav`)
    player.play(sound)
  }
}

const defaultPluginOptions = {
  sound: `Glass`,
  toast: true,
}

const getPluginOptions = (pluginOptions) => ({
  ...defaultPluginOptions,
  ...pluginOptions,
})

exports.onCreateDevServer = (_, pluginOptions) => {
  const options = getPluginOptions(pluginOptions)

  if (options.toast) {
    notifier.notify(
      {
        message: `gatsby app is ready`,
        open: `http://localhost:8000`,
        actions: [`open app`, `open graphiql`, `open both`],
        closeLabel,
        title,
        icon,
        timeout: 15,
      },
      function (_err, _response, { activationValue }) {
        if ([`open app`, `open both`].includes(activationValue)) {
          open(`http://localhost:8000`)
        }

        if ([`open graphiql`, `open both`].includes(activationValue)) {
          open(`http://localhost:8000/___graphiql`)
        }
      }
    )
  }

  playSound(options.sound)
}

exports.onPostBuild = (_, pluginOptions) => {
  const options = getPluginOptions(pluginOptions)

  if (options.toast) {
    notifier.notify({
      message: `your build has completed`,
      closeLabel,
      title,
      icon,
    })
  }

  playSound(options.sound)
}
