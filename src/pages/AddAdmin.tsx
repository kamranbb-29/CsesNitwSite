
import ParticlesBackground from "@/components/particles-background";
import Navigation from "@/components/navigation";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"


export default function AddAdmin(){
    return (
        <div className="min-h-screen">
            <Navigation />
            <ParticlesBackground />
            <Card className="w-full sm:max-w-lg">
                        <CardHeader>
                            <CardTitle>
                                Contact Us
                            </CardTitle>
                            <CardDescription>
                                Contact Us, Give us Feedback, Resolve Queries
                            </CardDescription>
                        </CardHeader>
                            <CardContent>
                                <form id="contact-form" onSubmit={handleSubmit}>
                                    <FieldGroup>
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, delay: 0.2 }}
                                        >
                                            <Field>
                                                <FieldLabel htmlFor="username">
                                                    Name
                                                </FieldLabel>
                                                <Input 
                                                    id = "username"
                                                    placeholder="John Doe"
                                                    autoComplete="off"
                                                    name="username"
                                                    required
                                                />
                                            </Field>
                                        </motion.div>
                                         <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, delay: 0.3 }}
                                        >
                                            <Field>
                                                <FieldLabel htmlFor="email">
                                                    Email
                                                </FieldLabel>
                                                <Input 
                                                    id="email"
                                                    placeholder="example@gmail.com"
                                                    name="email"
                                                    type = "email"
                                                    required
                                                />
                                            </Field>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.35 }}
                                        >
                                            <Field>
                                                <FieldLabel htmlFor="type">
                                                    Query Type
                                                </FieldLabel>
                                                <Select name="queryType" required>
                                                    <SelectTrigger className="w-full max-w-48 bg-slate-900 focus:border-green-500">
                                                        <SelectValue placeholder = "Select your Query Type"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Query Types</SelectLabel>
                                                            {selectItems.map((item) => (
                                                                <SelectItem value={item.value}>
                                                                    {item.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                        </motion.div>
                                        <motion.div
                                            initial = {{opacity : 0, x : -13}}
                                            animate = {{opacity : 1, x : 0}}
                                            transition={{duration : 0.35, delay : 0.4}}
                                        >
                                            <Field>
                                                <FieldLabel htmlFor="description">
                                                    Description / Query
                                                </FieldLabel>
                                                <InputGroup>
                                                    <InputGroupTextarea 
                                                        id = "description"
                                                        placeholder="Enter Your Feedback or Query"
                                                        className="min-h-24 resize-none border-2 focus:border-green-500 rounded-[10px] bg-slate-900"
                                                        rows = {6}
                                                        name="description"
                                                        required
                                                    />
                                                </InputGroup>
                                                <FieldDescription>
                                                    Mention any feedback related to recent events, queries about future events or any other CSE related question
                                                </FieldDescription>
                                            </Field>
                                        </motion.div>
                                    </FieldGroup>
                                    <ValidationError 
                                        prefix="Message" 
                                        field="message"
                                        errors={state.errors}
                                    />
                                </form>
                            </CardContent>
                        
                        <CardFooter>
                            <Field orientation="horizontal">
                                <Button type="reset" variant = "outline">
                                    Clear
                                </Button>
                                <Button type="submit" form="contact-form" onClick={() =>{
                                }}>
                                    Submit
                                </Button>
                            </Field>
                        </CardFooter>
                    </Card>
                </div>
            </motion.div>
        </div>
    )
    
}