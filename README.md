PowerManagement
===============
Plugin for Cordova (3.0+)

The PowerManagement plugin offers access to the devices power-management functionality.
It should be used for applications which keep running for a long time without any user interaction.

For details on power functionality see:

* Android: [PowerManager](http://developer.android.com/reference/android/os/PowerManager.html)
* iOS: [idleTimerDisabled](http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/Reference/Reference.html#//apple_ref/occ/instp/UIApplication/idleTimerDisabled)
* WindowsPhone: [UserIdleDetectionMode](http://msdn.microsoft.com/en-US/library/windowsphone/develop/microsoft.phone.shell.phoneapplicationservice.useridledetectionmode%28v=vs.105%29.aspx)

Installation
---------
Install the plugin using the cordova command line utility:

`$ cordova plugin add https://github.com/Viras-/cordova-plugin-powermanagement.git`

Usage
-----

### window.powerManagement.acquire(successCallback, failureCallback)
Acquire a wakelock by calling this.

	window.powerManagement.acquire(function() {
		console.log('Wakelock acquired');
	}, function() {
		console.log('Failed to acquire wakelock');
	});

### window.powerManagement.dim(successCallback, failureCallback)
This acquires a partial wakelock, allowing the screen to be dimmed.

	window.powerManagement.dim(function() {
		console.log('Wakelock acquired');
	}, function() {
		console.log('Failed to acquire wakelock');
	});

### window.powerManagement.release(successCallback, failureCallback)
Release the wakelock. It's important to do this when you're finished with the wakelock, to avoid unnecessary battery drain.

	window.powerManagement.release(function() {
		console.log('Wakelock released');
	}, function() {
		console.log('Failed to release wakelock');
	});

### [Android Only] window.powerManagement.setReleaseOnPause(enabled, successCallback, failureCallback)
By default, the plugin will automatically release a wakelock when your app is paused (e.g. when the screen is turned off, or the user switches to another app). It will reacquire the wakelock upon app resume. If you would prefer to disable this behaviour, you can use this function.

	window.powerManagement.setReleaseOnPause(false, function() {
		console.log('Set successfully');
	}, function() {
		console.log('Failed to set');
	});

Note that in all the above examples, all callbacks are optional.

License
=======
Copyright 2013 Wolfgang Koller

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
