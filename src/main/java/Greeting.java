

public class Greeting {
	private final static String GREETING = "Hello : ";
	private final String greeting;

	private Greeting(String greeting) {
		super();
		this.greeting = greeting;
	}

	public String getGreeting() {
		return greeting;
	}

	public static Greeting fromString(final String message) {
		return new Greeting(GREETING + message);
	}
}