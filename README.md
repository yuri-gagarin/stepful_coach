So it works, technically... barely.. but it works...

All right so the PROS or positives of it all: ( and notes for a meeting )


PROS: 
  1. It works
  2. Barely
  3. I ran out of PROS at this point...

CONS:
  1. It's a mess, let's start with oganization of things:
   - Too many ANY types, we want all of our actions typed, organized, types in their own separate files?
   - Component structure (there is none...), Ideally nicely organized subvomponents which inherit state/context from its parent components
   - API actions in the same module as components, types in the same module as components, helpers in the same module as components, etc.
  2. Validations: There are none, none on client side, none on server side, cross your heart, hope it works,
  3. Tests: See above 
  4. General DB schema... it works technically... multiple collections, "joined" together seems better suited for a relational approach...
  5. RESTful principles... I'm possibly updating an existing model in a POST:Create method... so yeah...
  6. Repeating yourself/DRY principles: to scale maybe have parent controller Classes/Interfaces (yes there are no classes in JS, I like to pretend :). Error helpers especially could be inherited...
  7. Desktop/Tablet/Mobile... yeah it doesn't even look good on desktop
  8. Shortcuts eveyrhwere... bad ones... (hours maybe should be stored as integers, but then we have to convert them back to a string value...)
  9. Mixing of local <useState> with <useContext>. It's ok... I guess, but should be better
  10-Nth: oh it can go on

