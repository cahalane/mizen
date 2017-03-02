package com.mizen;

import com.facebook.react.ReactActivity;
import com.estimote.sdk.SystemRequirementsChecker;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Mizen";
    }

    @Override
    protected void onResume() {
        super.onResume();
    	SystemRequirementsChecker.checkWithDefaultDialogs(this);
    }
}
