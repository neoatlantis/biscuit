Biscuit: a printable table of random passwords
==============================================

Biscuit is designed for important applications where a limit on authentication 
attempts is imposed. In such cases, it reduces the possibility of successful
guesses, even if the original owner is put under pressure.

One such example is smartcard. Most smartcards allow only 3 attempts before
blocking themselves, some even less. The information is likely destroyed after
these failed attempts. For anyone wishing to protect very important information
via smartcards, it's vital to ensure not only the confidentiality of the data
itself, but also that the person carrying it cannot be compromised.

Existence of [rubber hose cryptanalysis][RUBBERHOSE] tells us, that it's not
completely secure to put the whole master password in human brain. To eliminate
such attacks, there must be some improvements in strategy of password storage:

1. Master passwords, which protect all other data, must be a combination of
   remembered password and non-memorable key materials.
2. Non-memorable key materials should be quickly destroyable when the data
   under protection is in danger.
3. Key material should be destroyable even if the owner is physically isolated
   from it. It should not exist in plain data and must incorporate some
   measures against unlimited guesses.

Biscuit is part of an attempt to solve (2) and (3). Biscuit is a table of 260
passwords, all derived from a single, short Biscuit ID. The user may choose to
carry only the Biscuit ID around, or the full expanded version.

As long as a Biscuit ID exist, the whole table can be resumed at anytime. If a
Biscuit ID gets lost, the whole table (if not printed out) is lost. Also
there's no way to resume a table even if part of it remains. A user may desire
to print or write this ID down to e.g. a piece of water-soluable paper. That
solves (2).

In cases when users failed to destroy, and have lost physical control to their
biscuits, there exists another barrier. Biscuits are designed for situations
like smartcard PINs, where attempts to login/authenticate are very limited. An
attacker must guess the correct PIN out of 260 possibilities. Each guess has
only a successful rate of 0.4%, and repeating 3 times increases it only to 1.2%.
It's much safer even if a careless user have sticked the biscuit on a screen!
This usage solves (3).

Usage
-----

The whole repository is like a website. Navigate to
[https://neoatlantis.org/biscuit/](https://neoatlantis.org/biscuit/) or set up
your own server.

**CAUTION:** You should use a trustworthy computer to generate or view a
biscuit.



[RUBBERHOSE]: https://en.wikipedia.org/wiki/Rubber-hose_cryptanalysis
