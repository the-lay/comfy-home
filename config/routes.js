/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.routes = {

  //Home
  //TODO
  '/': {
    view: 'home/index'
  },


  /**
   * Devices
   */
  'get /devices/': 'DevicesController.index',

  //specific device
  'get /devices/:id': 'DevicesController.details',

  //device discovery
  'post /devices/found': 'DevicesController.found',

  //device pairing and setup
  'post /devices/pairing': 'DevicesController.checkPairing', //ajax
  'get /devices/setup/:id': 'DevicesController.setupIndex', //setup page
  'post /devices/setup/:id': 'DevicesController.setup', //setup validation

  //edit device
  'get /devices/edit/:id': 'DevicesController.editIndex',
  'post /devices/edit/:id': 'DevicesController.edit',

  //delete device
  'get /devices/delete/:id': 'DevicesController.delete',


  /**
   * Socket subscriptions
   */
   //new discovered devices
  '/subscribe/devices': 'SubscribeController.subscribeDiscoveredDevices',
  
  //new reports of the specific node
  '/subscribe/incoming': 'SubscribeController.subscribeIncoming',


  /**
   * Reporting
   */
  'post /report': 'ReportingController.incoming',



  //History
  //Only index, get specific and delete
  'get /history/': { //index
    view: 'history/index'
  },
  'get /history/:id': { //specific existing event
    view: 'history/index'
  },
  'post /history/:id/delete': { //delete existing event
    view: 'history/index'
  },

  //Triggers
  //Should have full spectrum of actions
  'get /triggers/': { //index
    view: 'triggers/index'
  },
  'get /triggers/:id': { //specific existing trigger
    view: 'triggers/index'
  },
  'post /triggers/add': { //add new trigger condition
    view: 'triggers/index'
  },
  'post /triggers/:id/edit': { //edit existing trigger
    view: 'triggers/index'
  },
  'post /triggers/:id/delete': { //delete existing trigger
    view: 'triggers/index'
  },

  //Dashboard
  //There will be index and use actions
  'get /dashboard/': { //index
    view: 'dashboard/index'
  },
  'post /dashboard/use/:id': { //execute something somewhere
    view: 'dashboard/index'
  },

  /*
  // But what if you want your home page to display
  // a signup form located at `views/user/signup.ejs`?
  '/': {
    view: 'user/signup'
  }


  // Let's say you're building an email client, like Gmail
  // You might want your home route to serve an interface using custom logic.
  // In this scenario, you have a custom controller `MessageController`
  // with an `inbox` action.
  '/': 'MessageController.inbox'


  // Alternatively, you can use the more verbose syntax:
  '/': {
    controller: 'MessageController',
    action: 'inbox'
  }


  // If you decided to call your action `index` instead of `inbox`,
  // since the `index` action is the default, you can shortcut even further to:
  '/': 'MessageController'


  // Up until now, we haven't specified a specific HTTP method/verb
  // The routes above will apply to ALL verbs!
  // If you want to set up a route only for one in particular
  // (GET, POST, PUT, DELETE, etc.), just specify the verb before the path.
  // For example, if you have a `UserController` with a `signup` action,
  // and somewhere else, you're serving a signup form looks like: 
  //
  //		<form action="/signup">
  //			<input name="username" type="text"/>
  //			<input name="password" type="password"/>
  //			<input type="submit"/>
  //		</form>

  // You would want to define the following route to handle your form:
  'post /signup': 'UserController.signup'


  // What about the ever-popular "vanity URLs" aka URL slugs?
  // (you might remember doing this with `mod_rewrite` in Apache)
  //
  // This is where you want to set up root-relative dynamic routes like:
  // http://yourwebsite.com/twinkletoez
  //
  // NOTE:
  // You'll still want to allow requests through to the static assets,
  // so we need to set up this route to ignore URLs that have a trailing ".":
  // (e.g. your javascript, CSS, and image files)
  'get /*(^.*)': 'UserController.profile'

  */
};



/** 
 * (3) Action blueprints
 * These routes can be disabled by setting (in `config/controllers.js`):
 * `module.exports.controllers.blueprints.actions = false`
 *
 * All of your controllers ' actions are automatically bound to a route.  For example:
 *   + If you have a controller, `FooController`:
 *     + its action `bar` is accessible at `/foo/bar`
 *     + its action `index` is accessible at `/foo/index`, and also `/foo`
 */


/**
 * (4) Shortcut CRUD blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *			`module.exports.controllers.blueprints.shortcuts = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *		/foo/find/:id?	->	search lampshades using specified criteria or with id=:id
 *
 *		/foo/create		->	create a lampshade using specified values
 *
 *		/foo/update/:id	->	update the lampshade with id=:id
 *
 *		/foo/destroy/:id	->	delete lampshade with id=:id
 *
 */

/**
 * (5) REST blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *		`module.exports.controllers.blueprints.rest = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *
 *		get /foo/:id?	->	search lampshades using specified criteria or with id=:id
 *
 *		post /foo		-> create a lampshade using specified values
 *
 *		put /foo/:id	->	update the lampshade with id=:id
 *
 *		delete /foo/:id	->	delete lampshade with id=:id
 *
 */

/**
 * (6) Static assets
 *
 * Flat files in your `assets` directory- (these are sometimes referred to as 'public')
 * If you have an image file at `/assets/images/foo.jpg`, it will be made available
 * automatically via the route:  `/images/foo.jpg`
 *
 */



/**
 * (7) 404 (not found) handler
 *
 * Finally, if nothing else matched, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 */
 
