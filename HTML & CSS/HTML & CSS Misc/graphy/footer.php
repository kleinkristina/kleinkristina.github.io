<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Graphy
 */
?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer">

		<?php get_sidebar( 'footer' ); ?>

		<div class="site-bottom">

			<div class="site-info">
				<div class="site-copyright">
					&copy; <?php echo date( 'Y' ); ?> <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
				</div><!-- .site-copyright -->
				<div class="site-credit">
					<?php printf( wp_kses( __( 'Powered by <a href="%1$s">%2$s</a>', 'graphy' ), array( 'a' => array( 'href' => array() ) ) ), esc_url( __( 'https://wordpress.org/', 'graphy' ) ), 'WordPress' ); ?>
				<span class="site-credit-sep"> | </span>
					<?php printf( wp_kses( __( 'Theme: <a href="%1$s">%2$s</a> by %3$s', 'graphy' ), array( 'a' => array( 'href' => array() ) ) ), esc_url( __( 'http://themegraphy.com/wordpress-themes/graphy/', 'graphy' ) ), 'Graphy', 'Themegraphy' ); ?>
				</div><!-- .site-credit -->
			</div><!-- .site-info -->

		</div><!-- .site-bottom -->

	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
