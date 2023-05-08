export const version = '0.0.4';

export const agentSettings = {
	plugin_name: {
		type: 'input',
		label: 'Chat Bot Name',
	},
};

export const agentMessage = async (args) => {
	const { settings, messages = [], user, apiKey } = args;

	//return new Response("hello world from " + settings.plugin_name);

	const stream = new ReadableStream({
		start(controller) {
			const text = 'hello world from ' + settings.plugin_name;
			const encoder = new TextEncoder();

			for (const chunk of text.split('')) {
				const encodedChunk = encoder.encode(chunk);
				controller.enqueue(encodedChunk);
			}
			controller.close();
		},
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/plain',
			'Transfer-Encoding': 'chunked',
		},
	});
};
