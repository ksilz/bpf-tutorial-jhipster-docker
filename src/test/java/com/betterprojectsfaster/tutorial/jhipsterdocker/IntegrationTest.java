package com.betterprojectsfaster.tutorial.jhipsterdocker;

import com.betterprojectsfaster.tutorial.jhipsterdocker.MySimpleShopApp;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = MySimpleShopApp.class)
public @interface IntegrationTest {
}
