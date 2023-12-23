
package com.d4japp; // make sure this is your package name

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.ReactActivity;

public class SplashActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        intent.putExtras(this.getIntent());





        finish();
    }
}